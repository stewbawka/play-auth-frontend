import { reactive, toRefs, watch } from 'vue'
import mitt from 'mitt';
import { useApi } from '@/modules/api';

const IS_LOGGED_IN_KEY = 'discostudebakerLoggedIn';

interface User {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  isAuthenticating: boolean;
  user?: User;
}

const state = reactive<AuthState>({
  isAuthenticating: false,
  user: undefined,
});

const isLoggedIn = window.localStorage.getItem(IS_LOGGED_IN_KEY);

if ( isLoggedIn ) {
  const { loading, data, get } = useApi("/tokens/me"); 
  const config = {
    withCredentials: true
  }
  state.isAuthenticating = true;

  get(config); 

  watch([ loading ], () => {
    state.user = data.value.user;
    state.isAuthenticating = false;
  });
}

export const authEmitter = mitt();

export const useAuth = () => {
  const setUser = (payload: User): void => {
    state.user = payload;
    window.localStorage.setItem(IS_LOGGED_IN_KEY, 'true');
  };

  return {
    setUser,
    ...toRefs(state),
  };
};

