class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      writeReview: false,
      placeToReview: '',
      review: ''
    }
  }

  // Write Review
  sendReview = (e) => {
    e.preventDefault();
    var context = this;
    if ( this.state.placeToReview === '' || this.state.review === '' ) {
      return;
    }

    axios({
      method: 'POST',
      url: 'http://localhost:4568/reviews',
      data: {
        user: this.props.currentUser,
        review: this.state.review,
        place: this.state.placeToReview
      }
    })
    .then(function(response) {
      context.setState({
        placeToReview: '',
        review: ''
      })

      context.props.sendToMyReview();
    })
    .catch(function(error) {
      console.error(error);
    });

  }

  onReviewChange = (review) => {
    this.setState({
      review: review.target.value
    });
  }

  onPlaceToReviewChange = (place) => {
    this.setState({
      placeToReview: place.target.value
    });
  }

  // My Reviews

  render() {
    if ( this.props.reviewState === 'myReviews' ) {
      return (
        <div className="myReviews">
          <h2 className="reviewHeaders">My Reviews</h2>
          {this.props.reviews.reverse().map( (review, index) =>
            <div className="review" key={index}>
              <div><strong>Place: </strong>{review.place}</div>
              <div><strong>Date Reviewed: </strong>{Math.floor((((new Date()) - review.created_at) / 1000) / 60)} minutes ago</div>
              <p><strong>Review: </strong>{review.review}</p>
            </div>
          )}
        </div>
      );
    }

    if ( this.props.reviewState === 'writeReview' ) {
      return (
        <div className="writeReview">
          <h2 className="reviewHeaders">Write Review</h2>
          <form onSubmit={this.sendReview} >
            <h5 className="reviewHeaders">Where did you go?</h5>
            <input onChange={this.onPlaceToReviewChange} className="place" placeholder="Place to Review" />
            <h5 className="reviewHeaders">Tell us how your trip was!</h5>
            <textarea onChange={this.onReviewChange} className="reviewSubmit" rows="15" cols="50"></textarea>
            <input className="submitReview" type="submit" value="Send Review" />
          </form>
        </div>
      );
    }

    if ( this.props.reviewState === 'findReviews' ) {
      return (
        <div className="findReviews">
          <h2 className="reviewHeaders">Find Reviews</h2>
          <h5 className="reviewHeaders">What place do you have in mind?</h5>
          <input className="place" type="text" onChange={this.props.placeChange} />
          {this.props.reviews.reverse().map( (review, index) =>
            <div className="review" key={index}>
              <div><strong>Reviewed By: </strong> {review.user}</div>
              <div><strong>Date Reviewed: </strong>{Math.floor((((new Date()) - review.created_at) / 1000) / 60)} minutes ago</div>
              <p><strong>Review: </strong>{review.review}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        <h1 className="reviewBegin">Let's get started... "Friend"</h1>
      </div>
    );
  }
}