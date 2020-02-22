import React, { Component } from "react";

class App extends Component {
  state = { isSignedIn: null };

  getChannelID() {
    var request = window.gapi.client.youtube.channels.list({
      mine: true,
      part: "contentDetails"
    });
    request.execute(response => {
      console.log(response.result);

      // let playlistId = response.result.items[0].id;
      // console.log(playlistId); // これがチャンネルIDだああああああああああ
    });
  }

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: REACT_APP_YOUTUBE_API_KEY,
          clientId: REACT_APP_YOUTUBE_CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
          ],
          scope:
            "email profile https://www.googleapis.com/auth/youtube.readonly"
        })
        .then(() => {
          window.gapi.client.load("youtube", "v3", () => {
            if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
              // this.getChannelID();
              var usr = window.gapi.auth2.getAuthInstance().currentUser.get();
              var token = usr.getAuthResponse().id_token;
              // firebaseLogin(token);
              console.log("user", usr);
            } else {
              window.gapi.auth2
                .getAuthInstance()
                .signIn()
                .then(() => {
                  // this.getChannelID();
                  var usr = window.gapi.auth2
                    .getAuthInstance()
                    .currentUser.get();
                  var token = usr.getAuthResponse().id_token;
                  // firebaseLogin(token);
                })
                .catch(error => {
                  console.log(error);
                });
            }
          });
          const auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: auth.isSignedIn.get() });
        });
    });
  }

  renderAuth() {
    if (this.state.isSignedIn === null) {
      return <div>i dont know your google account</div>;
    } else if (this.state.isSignedIn) {
      return <div>login with google!!</div>;
    } else {
      return <div>I can not see your google account!!</div>;
    }
  }

  loginWithGoogle = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  logoutFromGoogle = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  render() {
    return (
      <div>
        {this.renderAuth()}
        <button onClick={this.loginWithGoogle}>login with google</button>
        <button onClick={this.logoutFromGoogle}>logout from google</button>
      </div>
    );
  }
}

export default App;
