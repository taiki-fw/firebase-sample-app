import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import firebase from "./firebase";
import Input from "./Components/Input";
import Content from "./Components/Content";

const App = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, [user]);

  const login = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }, []);

  const logout = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  return (
    <div className="App">
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt="ログインユーザーのアイコン"
          width="200"
          height="200"
          style={{ borderRadius: "50%" }}
        />
      ) : null}
      <p className="App-intro">{user && user.displayName}</p>
      {user ? (
        <button onClick={logout}>Google Logout</button>
      ) : (
        <button onClick={login}>Google Login</button>
      )}
      <Input />
      <Content />
    </div>
  );
};

export default App;
