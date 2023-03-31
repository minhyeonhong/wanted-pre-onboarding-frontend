// AuthContext
// signin(email, password):Promise<undefined>
// signup(email, password):Promise<undefined>
// logout():undefined

import { createContext, useContext } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children, authService }) {
  const signin = authService.signin.bind(authService);
  const login = authService.login.bind(authService);
  const signup = authService.signup.bind(authService);
  const join = authService.join.bind(authService);
  const logout = authService.logout.bind(authService);

  return (
    <AuthContext.Provider value={{ signin, login, signup, join, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
