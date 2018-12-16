import React from "react";
import { connect } from "react-redux";
//import ApplicationForGame from "../components/ApplicationForGame";
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

const styles = {
  margin: ".75rem auto"
};

export class ApplicationsForGamesList extends React.Component {
  componentDidMount() {
    console.log("line 34 applications list:", this.props);
    this.props.dispatch(fetchAllApplications());
  }

  render() {
    let user_id = localStorage.getItem("user_id");
    console.log("poster Id:", this.props.application.gamePoster_id);
    if (!this.props.application.gamePoster_id === user_id) {
      console.log("props in applications list:", this.props);
      return (
        <div>
          <h2>No Applications For Your Posted Games</h2>
        </div>
      );
    }
    return (
      <div>
        <h2>Applications For Your Posted Games</h2>
        {this.props.application.map(application => {
          if (application.gamePoster_id === user_id)
            return (
              <div>
                <p>{application.applicant_name}</p>
                <p>{}</p>
                <p>{}</p>
                <button style={styles} className="btn btn-primary">
                  Accept Applicant
                </button>
                <button style={styles} className="btn btn-primary">
                  Reject Applicant
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
    application: state.application
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

export default connect(mapStateToProps)(ApplicationsForGamesList);
