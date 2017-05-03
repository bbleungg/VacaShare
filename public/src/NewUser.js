class NewUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userField: '',
      passwordField: '',
      login: false
    }
  }

  onUserFieldChange(userField) {
    this.setState({
      userField: userField.target.value
    });
  }

  onPasswordFieldChange(passwordField) {
    this.setState({
      passwordField: passwordField.target.value
    });
  }

  handleNewUser(e) {
    e.preventDefault();

    this.props.createUser(this.state.userField, this.state.passwordField);
    this.setState({
      userField: '',
      passwordField: ''
    });
  }

  render() {

    return (
      <div className="createUserForm">
        <h2>Create User</h2>
        <form onSubmit={this.handleNewUser.bind(this)}>
          <div>
            <label>Username:</label>
            <input type="text" onChange={this.onUserFieldChange.bind(this)} value={this.state.userField} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" onChange={this.onPasswordFieldChange.bind(this)} value={this.state.passwordField} />
          </div>
          <div>
            <input type="submit" value="Create User" />
          </div>
        </form>
        <div>
          <form onSubmit={this.props.changeNewUserState} >
            <input type="submit" value="Go to Login" />
          </form>
        </div>
      </div>
    );
  }
}

window.NewUser = NewUser;