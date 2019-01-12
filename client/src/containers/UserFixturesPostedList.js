import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Fixture from "../components/Fixture";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { removeFixture, updateFixture } from "../actions/fixtures";
import { fetchAllApplications } from "../actions/applicationForGame";

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

// const styles = {
//   margin: ".75rem auto"
// };

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
              <div key={fixture._id}>
                <Fixture
                  fixture={fixture}
                  //onDelete={this.props.dispatch(removeFixture(fixture._id))}
                  //onDelete={this.props.onRemove}
                  displayApps="true"
                />
                <Link to={"/update-game/" + fixture._id}>
                  <button
                    style={{ marginRight: "14px" }}
                    fixture={fixture}
                    //onClick={() => this.props.updateFixture()}
                    className="btn teal darken-3"
                  >
                    <i className="material-icons right Tiny">arrow_upward</i>
                    Update This Game
                  </button>
                </Link>
                <button
                  style={{ marginRight: "14px" }}
                  onClick={() => this.removeFixture(fixture)}
                  className="btn teal darken-3"
                >
                  <i className="material-icons right Tiny">delete</i>
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
