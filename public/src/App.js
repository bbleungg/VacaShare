class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      loggedIn: false,
      newUser: false
    }

    this.changeLoginState = this.changeLoginState.bind(this);
    this.changeNewUserState = this.changeNewUserState.bind(this);
    this.onClickTest = this.onClickTest.bind(this);
    this.loginRequest = this.loginRequest.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  // Handle Login
  changeLoginState() {
    if ( this.state.loggedIn ) {
      this.setState({
        currentUser: null
      });
    }

    this.setState({
      loggedIn: !this.state.loggedIn
    });

    this.render();
  }

  loginRequest(username, password) {
    var context = this;
    axios({
      method: 'POST',
      url: 'http://localhost:4568/login',
      data: {
        username: username,
        password: password
      }
    })
    .then(function(response) {
      // Check if login was correct
      if ( response.data.user_name ) {
        context.changeLoginState();
        context.setState({
          currentUser: response.data.user_name
        });
      }
    })
    .catch(function(error) {
      console.error(error);
    });
  }


  // Handle Create User
  changeNewUserState() {
    this.setState({
      newUser: !this.state.newUser
    });

    this.render();
  }

  createUser(username, password) {
    var context = this;
    axios({
      method: 'POST',
      url: 'http://localhost:4568/createuser',
      data: {
        username: username,
        password: password
      }
    })
    .then(function(response) {
      context.changeNewUserState();
    })
    .catch(function(error) {
      console.error(error);
    });
  }


  // Test
  onClickTest() {
    this.changeLoginState();
  }



  render() {

    if ( this.state.newUser ) {
      return (
        <NewUser createUser={this.createUser} changeNewUserState={this.changeNewUserState} />
      );
    }

    if ( !this.state.loggedIn ) {
      return (
        <Login login={this.loginRequest} changeNewUserState={this.changeNewUserState} />
      );
    }


    return (
      <div className="App">
        <div className="header">
          <h2>React App</h2>
        </div>
        <button onClick={this.onClickTest}>Touch Me</button>
      </div>
    );
  }
}

window.App = App;