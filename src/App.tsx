import * as React from "react";
import "./App.css";
import firebase from "./firebase";
import Input from "./Components/Input";
import Content from "./Components/Content";

interface UserStatus {
  user: firebase.User | null;
}

class App extends React.Component {
  public state: UserStatus = {
    user: null
  };

  public componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  public login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  public logout() {
    firebase.auth().signOut();
  }

  public render() {
    return (
      <div className="App">
        <img
          src={this.state.user?.photoURL || ""}
          alt="ログインユーザーのアイコン"
          width="200"
          height="200"
          style={{ borderRadius: "50%" }}
        />
        <p className="App-intro">
          {this.state.user && this.state.user.displayName}
        </p>
        {this.state.user ? (
          <button onClick={this.logout}>Google Logout</button>
        ) : (
          <button onClick={this.login}>Google Login</button>
        )}
        <Input />
        <Content />
      </div>
    );
  }
}

export default App;
