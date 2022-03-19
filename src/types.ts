export interface User {
  id?: int;
  email?: string;
  firstName?: string;
  lastName?: string;
}
export interface Session {
  token?: string;
  user?: User;
}

export interface Store {
  session?: Session; 
  setSession?: (string, User) => void;
  clearSession?: () => void;
}
