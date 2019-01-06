import React from "react";
import { connect } from "react-redux";
import Fixture from "../components/Fixture";
import PostApplication from "../components/PostApplication";
//import { fetchAllFixtures } from "../actions/fixtures";
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

class AllFixturesList extends React.Component {
  // componentDidMount() {
  //   console.log("Apply to this, props:", this.props);
  //   fetchAllFixtures();
  // }
  constructor(props) {
    super(props);
    this.state = {
      applicant_id: "",
      applicant_name: "",
      game_id: "",
      gamePoster_id: ""
    };
  }

  applyForFixture = () => {
    let user_id = localStorage.getItem("user_id");
    let user_name = localStorage.getItem("user_name");
    {
      this.props.fixtures.map(fixture => {
        console.log("props in apply:", this.props);
        if (fixture._id === this.props.match.params.id) {
          let game_id = fixture._id;
          let gamePoster_id = fixture.user_id;
          this.setState({
            user_id: user_id,
            user_name: user_name,
            game_id,
            gamePoster_id
          });
        }
      });
      console.log("props:", this.props, "state:", this.state);
    }
    this.props.createApplicationForGame(this.state.application);
    alert(
      "The Game Owner knows You want to Play in their Game. Please wait for their response."
    );
    window.location.href = "/home";
  };

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
              <div key={fixture._id}>
                <Fixture fixture={fixture} />
                <button
                  //style={styles}
                  type="button"
                  className="btn teal darken-3"
                  onClick={this.applyForFixture}
                >
                  <i className="material-icons right">chevron_right</i>
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
    createApplicationForGame: application => {
      dispatch(createApplicationForGame(application));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllFixturesList);
