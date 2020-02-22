import * as React from "react";
import axios from "axios";
import "./App.css";
import firebase from "./firebase";
import PlayList from "./PlayList/PlayList.js";

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
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential;
          console.log(token);
        }
        // The signed-in user info.
        var user = result.user;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  public login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    // axios.get("https://accounts.google.com/o/oauth2/auth", {
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   params: {
    //     client_id:
    //       "875303700757-fnch5dcl9cpjosm29qgsf4vt5g4dipsi.apps.googleusercontent.com",
    //     redirect_uri: "http://localhost:3000",
    //     response_type: "token",
    //     scope: "https://www.googleapis.com/auth/youtube"
    //   }
    // });
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
        <PlayList />
      </div>
    );
  }
}

export default App;
