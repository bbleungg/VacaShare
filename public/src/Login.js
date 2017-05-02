var Login = ({login, tempUser, tempPassword, onTempUser, onTempPassword}) => (
  <div className="loginform">
    <form onSubmit={login}>
      <div>
        <label>Username:</label>
        <input type="text" value={tempUser} />
      </div>
      <div>
        <label>Password:</label>
        <input type="text" value={tempPassword} />
      </div>
      <div>
        <input type="submit" value="Login"/>
      </div>
    </form>
  </div>
);

window.Login = Login;