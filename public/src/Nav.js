var Nav = ({logout, myReviews, writeReview, findReviews}) => (
  <nav className="nav">
    <span onClick={myReviews}>My Reviews</span>
    <span onClick={writeReview}>Write Review</span>
    <span onClick={findReviews}>Find Reviews</span>
    <span onClick={logout}>Logout</span>
  </nav>
);

window.Nav = Nav;