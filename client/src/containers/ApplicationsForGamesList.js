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
    this.props.dispatch(fetchAllApplications());
    console.log("line 34 applications list:", this.props);
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
          if (
            application.gamePoster_id === user_id &&
            application.archive == false
          ) {
            console.log("applications ln 50:", application);
            let applicantName = application.applicant_name;
            {
              this.props.fixture.map(fixture => {
                if (application.game_id == fixture._id) {
                  console.log("Ffixture ln 58:", fixture.venue);
                  let date = fixture.date;
                  let time = fixture.time;
                  let playersReq = fixture.playersReq;
                  let cost = fixture.Cost;
                  let pitchNo = fixture.pitchNo;
                  let venue = fixture.venue;
                  return (
                    <div>
                      <p>Applicant: {applicantName}</p>
                      <p>date: {date}</p>
                      <p>time: {time}</p>
                      <p>playersReq: {playersReq}</p>
                      <p>cost: {cost}</p>
                      <p>pitchNo: {pitchNo}</p>
                      <p>venue: {venue}</p>
                      <button style={styles} className="btn btn-primary">
                        Accept Applicant
                      </button>
                      <button style={styles} className="btn btn-primary">
                        Reject Applicant
                      </button>
                    </div>
                  );
                }
              });
            }
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    application: state.application,
    fixture: state.fixture
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
