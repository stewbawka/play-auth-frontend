import { reactive, readonly, provide, inject, InjectionKey, Ref, ref } from 'vue';
import mitt from 'mitt'
import { Session, Store, User } from '@/types';

const SessionKey: InjectionKey<Ref<Session>> = Symbol('Session');
const SetSessionKey: InjectionKey<(s: string) => void> = Symbol('SetSession');
const ClearSessionKey: InjectionKey<() => void> = Symbol('ClearSession');

export const emitter = mitt();

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
    emitter.emit('sessionUpdated', newSession);
  };
  const clearSession = () => {
    const newSession: Session = {
      token: undefined,
      user: undefined,
    };
    session.value = newSession;
    emitter.emit('sessionUpdated', newSession);
  };
  provide(SessionKey, ref(session));
  provide(SetSessionKey, setSession);
  provide(ClearSessionKey, clearSession);
}

export const useStore = () => {
  const store: Store = {
    session: inject(SessionKey),
    setSession: inject(SetSessionKey),
    clearSession: inject(ClearSessionKey),
  };
  return store;
}
