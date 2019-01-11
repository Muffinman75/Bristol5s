import React from "react";
import { connect } from "react-redux";
import Fixture from "../components/Fixture";
//import PostApplication from "../components/PostApplication";
//import { fetchAllFixtures } from "../actions/fixtures";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
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

  applyForFixture = fixture => {
    let application = {
      applicant_id: localStorage.getItem("user_id"),
      applicant_name: localStorage.getItem("user_name"),
      game_id: fixture._id,
      gamePoster_id: fixture.user_id
    };
    confirmAlert({
      title: "Apply To This Fixture!",
      message: "Apply to this fixture? Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.createApplicationForGame(application);
            alert("Application sent to Game Owner!");
          }
        },
        {
          label: "No",
          onClick: () => alert("Application not sent!")
        }
      ]
    });

    this.props.history.push("/home");
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
          let userApplied = false;
          let user_id = localStorage.getItem("user_id");
          if (fixture.user_id !== user_id) {
            console.log("apps in allfixtures props", this.props);
            return (
              <div key={fixture._id}>
                <Fixture fixture={fixture} />
                {this.props.applications.map(application => {
                  if (
                    application.game_id === fixture._id &&
                    application.applicant_name ===
                      localStorage.getItem("user_name")
                  ) {
                    let userApplied = true;
                  }

                  {
                    if (userApplied == true) {
                      return (
                        <button
                          //style={styles}
                          type="button"
                          className="btn teal darken-3 disabled"
                          onClick={() => this.applyForFixture(fixture)}
                        >
                          <i className="material-icons right">chevron_right</i>
                          Already Applied
                        </button>
                      );
                    } else {
                      return (
                        <button
                          //style={styles}
                          type="button"
                          className="btn teal darken-3"
                          onClick={() => this.applyForFixture(fixture)}
                        >
                          <i className="material-icons right">chevron_right</i>
                          Apply To Play
                        </button>
                      );
                    }
                  }
                })}
              </div>
            );
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fixtures: state.fixture,
    applications: state.application
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
