import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import firebase from "./firebase";
import { createUser } from "./db";

const authContext = createContext();
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
      setUser(user);
      cookie.set("fast-feedback-auth", true, {
        expires: 3,
      });
      return user;
    } else {
      cookie.remove("fast-feedback-auth");
      return false;
    }
  };

  const signinWithGitHub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        Router.push("/dashboard");
        handleUser(response.user);
      });
  };

  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        Router.push("/dashboard");
        handleUser(response.user);
      });
  };

  const signout = () => {
    Router.push("/");
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    token: user.ya,
    photoUrl: user.photoURL,
    provider: user.providerData[0].providerId,
  };
};
