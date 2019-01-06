import { connect } from "react-redux";
import { createFixture } from "../actions/fixtures";
import PostGame from "../components/PostGame";

const mapDispatchToProps = dispatch => {
  return {
    onAddFixture: fixture => {
      dispatch(createFixture(fixture));
    }
  };
};

export default connect(mapDispatchToProps)(PostGame);
