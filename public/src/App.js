class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      tempUser: '',
      tempPassword: ''
    }
  }

  onTempUser(user) {
    this.setState
  }

  onClickTest() {
    axios({
      method: 'GET',
      url: 'http://localhost:4568'
    })
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  loginRequest(e) {
    console.log(this.state.tempUser);
    axios({
      method: 'POST',
      url: 'http://localhost:4568/login'
    });

    this.setState({
      tempUser: '',
      tempPassword: ''
    });

    e.preventDefault();
  }

  render() {

    if ( !this.state.loggedIn ) {
      return (
        <Login login={this.loginRequest.bind(this)} tempUser={this.state.tempUser} tempPassword={this.state.tempPassword} />
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