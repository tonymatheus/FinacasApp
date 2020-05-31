import React, {createContext, useState, useEffect} from 'react';
import firebase from '../Services/FirebaseConnection';
import AsynStorage from '@react-native-community/async-storage';

export const AuthConText = createContext({});

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsynStorage.getItem('Auth_user');
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  //funcção para Logar Usuários
  async function signIn(email, password) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        await firebase
          .database()
          .ref('users')
          .child(uid)
          .once('value')
          .then(snapshot => {
            let data = {
              uid: uid,
              nome: snapshot.val().nome,
              email: value.user.email,
            };
            setUser(data);
            storageUser(data);
          });
      })
      .catch(error => {
        alert(error.code);
      });
  }

  //Cadastro de Usuários
  async function signUp(email, password, nome) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        await firebase
          .database()
          .ref('users')
          .child(uid)
          .set({
            saldo: 0,
            nome: nome,
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
            };
            setUser(data);
            storageUser(data);
          });
      })
      .catch(error => {
        alert(error.code);
      });
  }
  async function storageUser(data) {
    await AsynStorage.setItem('Auth_user', JSON.stringify(data));
  }

  return (
    <AuthConText.Provider
      value={{signed: !!user, user, signUp, signIn, loading}}>
      {children}
    </AuthConText.Provider>
  );
}

export default AuthProvider;
