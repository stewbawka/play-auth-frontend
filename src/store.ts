import { reactive, readonly, provide, inject, InjectionKey, Ref, ref } from 'vue';
import { Session, Store, User } from '@/types';

const SessionKey: InjectionKey<Ref<Session>> = Symbol('Session');
const SetSessionKey: InjectionKey<(s: string) => void> = Symbol('SetSession');

export const createStore = () => {
  const s: Session = {
    token: undefined,
    user: undefined
  };
  const session = ref(s);
  const setSession = (newToken: string, user: User) => {
    const newSession: Session = {
      token: newToken,
      user: user,
    };
    session.value = newSession;

  };
  provide(SessionKey, ref(session));
  provide(SetSessionKey, setSession);
}

export const useStore = () => {
  const store: Store = {
    session: inject(SessionKey),
    setSession: inject(SetSessionKey),
  };
  return store;
}
