class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      loggedIn: false,
      newUser: false,
      reviewState: null,
      reviews: [],
      place: ''
    }
  }

  // Handle Login
  changeLoginState = () => {
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

  loginRequest = (username, password) => {
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
      if ( response.data.user_id ) {
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
  changeNewUserState = () => {
    this.setState({
      newUser: !this.state.newUser
    });

    this.render();
  }

  createUser = (username, password) => {
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

  // Get Reviews
  getUserReviews = () => {
    var context = this;
    axios({
      method: 'GET',
      url: 'http://localhost:4568/reviews',
    })
    .then(function(response) {
      var reviews = response.data.filter( (review) => { return review.user === context.state.currentUser; });
      context.setState({
        reviews: reviews
      });
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  getPlaceReviews = () => {
    var context = this;
    axios({
      method: 'GET',
      url: 'http://localhost:4568/reviews',
    })
    .then(function(response) {
      var reviews = response.data.filter( (review) => { return review.place === context.state.place; });
      context.setState({
        reviews: reviews
      });
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  // Navigation Handling
  logoutUser = () => {
    this.changeLoginState();
    this.setState({
      reviewState: null
    });
  }

  changeToMyReviews = () => {
    this.getUserReviews(this.state.currentUser);
    this.setState({
      reviewState: 'myReviews'
    });

    this.render();
  }

  changeToWriteReview = () => {
    this.setState({
      reviewState: 'writeReview'
    });

    this.render();
  }

  changeToFindReviews = () => {
    this.setState({
      reviewState: 'findReviews'
    });

    this.render();
  }

  // Handle Place Change
  onPlaceChange = (place) => {
    console.log(place.target.value);
    this.setState({
      place: place.target.value
    });
    this.getPlaceReviews();

    this.render();
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
          <h1>Welcome to VacaShare, friend.</h1>
        </div>
        <h3>Reviews</h3>
        <div className="reviewsContainer">
          <Nav logout={this.logoutUser} myReviews={this.changeToMyReviews} writeReview={this.changeToWriteReview} findReviews={this.changeToFindReviews} />
          <Review reviews={this.state.reviews} reviewState={this.state.reviewState} sendToMyReview={this.changeToMyReviews} currentUser={this.state.currentUser} placeChange={this.onPlaceChange} />
        </div>
      </div>
    );
  }
}

window.App = App;