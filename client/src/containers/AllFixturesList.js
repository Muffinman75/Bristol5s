import React from "react";
import { connect } from "react-redux";
import Fixture from "../components/Fixture";
import ApplicantForGame from "../components/ApplicantForGame";
import PostApplication from "../components/PostApplication";
import { fetchAllFixtures } from "../actions/fixtures";
import { createApplicationForGame } from "../actions/applicationForGame";

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
  margin: "auto"
};

class AllFixturesList extends React.Component {
  // componentDidMount() {
  //   console.log("Apply to this, props:", this.props);
  //   fetchAllFixtures();
  // }

  render() {
    if (!this.props.fixtures.length) {
      return <div>There are no Games to play in, please check again later</div>;
    }
    return (
      <div>
        <h1>Wanna Play ?</h1>
        <p>Please select a game from below to play in.</p>
        <p>The owner of the game will be immediately notified</p>
        <p>that you would like to play in their game.</p>
        {this.props.fixtures.map(fixture => {
          let user_id = localStorage.getItem("user_id");
          let user_name = localStorage.getItem("user_name");
          if (fixture.user_id !== user_id)
            return (
              <div key={fixture._id}>
                <Fixture
                  fixture={fixture}
                  //onDelete={this.props.dispatch(removeFixture(fixture._id))}
                  //onDelete={this.props.onRemove}
                />
                <button
                  style={styles}
                  type="button"
                  onClick={() =>
                    this.props.createApplicationForGame(
                      user_id,
                      user_name,
                      fixture._id,
                      fixture.user_id
                    )
                  }
                  className="btn teal darken-3"
                >
                  Apply To Play
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
    createApplicationForGame: () => {
      dispatch(createApplicationForGame());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllFixturesList);
