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
  token?: string;
}

const state = reactive<AuthState>({
  isAuthenticating: false,
  user: undefined,
  token: undefined,
});

export const authEmitter = mitt();

export const useAuth = () => {
  const setUser = (token: string, payload: User): void => {
    state.user = payload;
    state.token = token;
    window.localStorage.setItem(IS_LOGGED_IN_KEY, 'true');
    authEmitter.emit('authStateUpdated', toRefs(state));
  };

  return {
    setUser,
    ...toRefs(state),
  };
};

const isLoggedIn = window.localStorage.getItem(IS_LOGGED_IN_KEY);
if ( isLoggedIn ) {
  const config = {
    withCredentials: true
  }
  const { loading, data, error, get } = useApi("/tokens/me", config); 
  state.isAuthenticating = true;

  get(config); 

  watch([ loading ], () => {
    if (error.value) {
      window.localStorage.removeItem(IS_LOGGED_IN_KEY);
    } else {
      const { setUser } = useAuth();
      setUser(data.value.token, data.value.user);
    }
    state.isAuthenticating = false;
  });
}


