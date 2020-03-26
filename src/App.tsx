import * as React from "react";
import "./App.css";
import firebase from "./firebase";

interface UserStatus {
  user: firebase.User | null;
}

class App extends React.Component {
  public state: UserStatus = {
    user: null
  };

  public componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
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
        <p className="App-intro">
          名前: {this.state.user && this.state.user.displayName}
        </p>
        <p className="App-intro">
          UID: {this.state.user && this.state.user.uid}
        </p>

        {this.state.user ? (
          <button onClick={this.logout}>Google Logout</button>
        ) : (
          <button onClick={this.login}>Google Login</button>
        )}
      </div>
    );
  }
}

export default App;
