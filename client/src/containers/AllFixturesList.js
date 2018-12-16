import React from "react";
import { connect } from "react-redux";
import Fixture from "../components/Fixture";
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

export class AllFixturesList extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(fetchAllFixtures());
  }

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
          if (fixture.user_id !== user_id)
            return (
              <div>
                <Fixture
                  fixture={fixture}
                  //onDelete={this.props.dispatch(removeFixture(fixture._id))}
                  //onDelete={this.props.onRemove}
                  key={fixture._id}
                />
                <button
                  style={styles}
                  type="button"
                  onclick={createApplicationForGame}
                  className="btn btn-primary"
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

// const mapDispatchToProps = dispatch => {
//   return {
//     onRemove: id => {
//       dispatch(removeFixture(id));
//     },
//     fetchAllFixtures: () => {
//       dispatch(fetchAllFixtures);
//     }
//   };
// };

export default connect(mapStateToProps)(AllFixturesList);
