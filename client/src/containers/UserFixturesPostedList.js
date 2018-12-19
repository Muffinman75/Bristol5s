import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Fixture from "../components/Fixture";
import {
  removeFixture,
  fetchAllFixtures,
  updateFixture
} from "../actions/fixtures";

/*function FixtureList(props) {
  if (!this.props.fixtures.length) {
    return <div>No Fixtures</div>;
  }
  return (
    <div>
      {props.fixtures.map(fixture => {
        return (
          <Fixture
            fixture={fixture}
            onDelete={props.onRemove}
            key={fixture._id}
          />
        );
      })}
    </div>
  );
}*/

const styles = {
  margin: ".75rem auto"
};

class UserFixturesPostedList extends React.Component {
  componentDidMount() {
    console.log("User Fixtures list, props:", this.props);
    fetchAllFixtures();
  }

  render() {
    if (!this.props.fixtures.length) {
      return (
        <div>
          <h2>You Have Not Posted Any Fixtures</h2>
        </div>
      );
    }
    return (
      <div>
        <h2>Your Posted Games</h2>
        {this.props.fixtures.map(fixture => {
          let user_id = localStorage.getItem("user_id");
          if (fixture.user_id === user_id)
            return (
              <div>
                <Fixture
                  fixture={fixture}
                  //onDelete={this.props.dispatch(removeFixture(fixture._id))}
                  //onDelete={this.props.onRemove}
                  key={fixture._id}
                  displayApps="true"
                />
                <Link to="/update-game">
                  <button
                    style={styles}
                    onClick={() => updateFixture()}
                    className="btn btn-primary"
                  >
                    Update This Game
                  </button>
                </Link>
                <button
                  style={styles}
                  onClick={() => removeFixture()}
                  className="btn btn-primary"
                >
                  Remove This Game
                </button>
              </div>
            );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fixtures: state.fixture
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFixture: () => {
      dispatch(removeFixture);
    },
    fetchAllFixtures: () => {
      dispatch(fetchAllFixtures);
    },
    updateFixture: () => {
      dispatch(updateFixture);
    }
  };
};

export default connect(mapStateToProps)(UserFixturesPostedList);
