import React, {createContext, useState} from 'react';

export const AuthConText = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState({
    nome: 'Tony',
    uid: 'fhsh21337sdfj',
  });
  return <AuthConText.Provider value={{user}}>{children}</AuthConText.Provider>;
}

export default AuthProvider;
