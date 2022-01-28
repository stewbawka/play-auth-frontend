import { reactive, readonly, provide, inject, InjectionKey, Ref, ref } from 'vue';
import { Session, Store } from '@/types';

const SessionKey: InjectionKey<Ref<Session>> = Symbol('Session');
const SetSessionTokenKey: InjectionKey<(s: string) => void> = Symbol('SetSessionToken');

export const createStore = () => {
  const s: Session = {
    token: 'testing'
  };
  const session = ref(s);
  const setSessionToken = (newToken: string) => {
    const newSession: Session = {
      token: newToken,
    };
    session.value = newSession;

  };
  provide(SessionKey, ref(session));
  provide(SetSessionTokenKey, setSessionToken);
}

export const useStore = () => {
  const store: Store = {
    session: inject(SessionKey),
    setSessionToken: inject(SetSessionTokenKey),
  };
  return store;
}
