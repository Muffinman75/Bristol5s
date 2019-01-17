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
            alert("This fixture has now been deleted!");
          }
        },
        {
          label: "No",
          onClick: () => alert("Fixture not deleted!")
        }
      ]
    });
    this.props.history.push("/home");
  }

  render() {
    return (
      <div>
        <h3 className="center headings light-blue-text darken-1">
          Welcome {localStorage.getItem("user_name")}!
        </h3>
        <h2 className="center headings light-blue-text darken-1">
          Your Posted Games
        </h2>
        {this.props.fixtures.map(fixture => {
          let user_id = localStorage.getItem("user_id");
          if (fixture.user_id === user_id)
            return (
              <div key={fixture._id}>
                <Fixture fixture={fixture} displayApps="true" {...this.props} />
                <div className="center-align">
                  <Link to={"/update-game/" + fixture._id}>
                    <button
                      style={{ marginRight: "14px", marginBottom: "10px" }}
                      fixture={fixture}
                      className="btn light-blue darken-1 waves"
                    >
                      <i className="material-icons right Tiny">arrow_upward</i>
                      Update This Game
                    </button>
                  </Link>
                </div>
                <div className="center-align">
                  <button
                    style={{ marginRight: "14px", marginBottom: "10px" }}
                    onClick={() => this.removeFixture(fixture)}
                    className="btn light-blue darken-1 waves"
                  >
                    <i className="material-icons right Tiny">delete</i>
                    Remove This Game
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
