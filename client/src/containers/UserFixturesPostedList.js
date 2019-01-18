import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Fixture from "../components/Fixture";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { removeFixture } from "../actions/fixtures";
import { fetchAllApplications } from "../actions/applicationForGame";

class UserFixturesPostedList extends React.Component {
  componentDidMount() {
    console.log("homenow", this.props);
    this.props.fetchAllApplications();
  }

  removeFixture(fixture) {
    confirmAlert({
      title: "Delete This Fixture!",
      message: "Delete this fixture? Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.removeFixture(fixture);
          }
        },
        {
          label: "No",
          onClick: () => this.props.history.push("/home")
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <h2 className="center headings light-blue-text darken-1">Homepage</h2>
        <h3 className="center headings light-blue-text darken-1">
          Welcome {localStorage.getItem("user_name")}!
        </h3>
        <p className="center headings flow-text light-blue-text darken-1">
          You can review and amend any of the games you have posted here
        </p>
        {this.props.fixtures.map(fixture => {
          let user_id = localStorage.getItem("user_id");
          if (fixture.user_id === user_id)
            return (
              <div key={fixture._id}>
                <Fixture fixture={fixture} displayApps="true" {...this.props} />
                <div className="row center-align">
                  <Link to={"/update-game/" + fixture._id}>
                    <button
                      style={{ marginRight: "14px", marginBottom: "10px" }}
                      fixture={fixture}
                      className="btn light-blue darken-1 waves"
                    >
                      <i className="material-icons right Tiny">arrow_upward</i>
                      Update Game
                    </button>
                  </Link>
                  <button
                    style={{ marginRight: "14px", marginBottom: "10px" }}
                    onClick={() => this.removeFixture(fixture)}
                    className="btn light-blue darken-1 waves"
                  >
                    <i className="material-icons right Tiny">delete</i>
                    Remove Game
                  </button>
                </div>
              </div>
            );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllApplications: () => {
      dispatch(fetchAllApplications());
    },
    removeFixture: fixture => {
      dispatch(removeFixture(fixture));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFixturesPostedList);
