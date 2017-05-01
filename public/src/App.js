class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickTest() {
    axios({
      method: 'GET',
      url: 'http://localhost:4568',
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'access-control-allow-headers': 'content-type, accept',
        'access-control-max-age': 10 // Seconds.
      }
    })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.error(err);
      });
  }

  render() {
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
