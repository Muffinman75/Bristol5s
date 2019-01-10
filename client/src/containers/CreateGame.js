import { connect } from "react-redux";
import { createFixture } from "../actions/fixtures";
import PostGame from "../components/PostGame";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onAddFixture: (fixture, cb) => {
      dispatch(createFixture(fixture, cb));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostGame);
