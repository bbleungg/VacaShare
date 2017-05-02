class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onUsernameChange(usernameInput) {
    this.setState({
      username: usernameInput.target.value
    });
  }

  onPasswordChange(passwordInput) {
    this.setState({
      password: passwordInput.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.props.login(this.state.username, this.state.password);
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {

    return (
      <div className="loginForm">
        <h2>Login</h2>
        <form onSubmit={this.handleLogin.bind(this)}>
          <div>
            <label>Username:</label>
            <input type="text" onChange={this.onUsernameChange.bind(this)} value={this.state.username} />
          </div>
          <div>
            <label>Password:</label>
            <input type="text" onChange={this.onPasswordChange.bind(this)} value={this.state.password} />
          </div>
          <div>
            <input type="submit" value="Login User" />
          </div>
        </form>
        <div>
          <form onSubmit={this.props.changeNewUserState} >
            <input type="submit" value="Create User" />
          </form>
        </div>
      </div>
    );
  }
}

window.Login = Login;