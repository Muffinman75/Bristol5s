import React from "react";
import { connect } from "react-redux";
import Fixture from "../components/Fixture";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { createApplicationForGame } from "../actions/applicationForGame";

class AllFixturesList extends React.Component {
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
            this.props.createApplicationForGame(
              application,
              (passed, response) => {
                if (passed) {
                  window.location.href = "/find-game";
                } else {
                  alert(response);
                }
              }
            );
          }
        },
        {
          label: "No",
          onClick: () => this.props.history.push("/find-game")
        }
      ]
    });
  };

  render() {
    if (!this.props.fixtures.length) {
      return (
        <div
          className="valign-wrapper center-align"
          style={{ marginTop: "200px" }}
        >
          <div className="container">
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle" />
                </div>
                <div className="gap-patch">
                  <div className="circle" />
                </div>
                <div className="circle-clipper right">
                  <div className="circle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1 className="center headings light-blue-text darken-1">
          Wanna Play ?
        </h1>
        <p className="center headings light-blue-text darken-1 flow-text">
          Please select a game from below to play in.
        </p>
        <p className="center headings light-blue-text darken-1 flow-text">
          The owner of the game will be immediately notified
        </p>
        <p className="center headings light-blue-text darken-1 flow-text">
          that you would like to play in their game.
        </p>
        {this.props.fixtures.map(fixture => {
          let user_id = localStorage.getItem("user_id");
          if (fixture.user_id !== user_id) {
            return (
              <div key={fixture._id}>
                <Fixture fixture={fixture} />
                <div className="center-align">
                  <button
                    style={{ marginBottom: "10px" }}
                    type="button"
                    className="btn light-blue darken-1 waves"
                    onClick={() => this.applyForFixture(fixture)}
                  >
                    <i className="material-icons right">chevron_right</i>
                    Apply To Play
                  </button>
                </div>
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
    createApplicationForGame: (application, cb) => {
      dispatch(createApplicationForGame(application, cb));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllFixturesList);
