import { Ref } from 'vue';
export interface Session {
  token?: string;
}

export interface Store {
  session?: Ref<Session>; 
  setSessionToken?: (string) => void;
}

