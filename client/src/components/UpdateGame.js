import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import classnames from "classnames";
import Calendar from "./Calendar";

// import "bootstrap/dist/css/bootstrap.min.css";

class UpdateGame extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  // componentDidMount that dispatches getFixtureById using this.props.match.params.id

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fromDateCalendar = dateFromCalendar => {
    console.log("Date From Calendar:", dateFromCalendar);
    this.setState({
      date: dateFromCalendar
    });
  };

  fromTimePicker = timeFromCalendar => {
    console.log("Time From Calendar:", timeFromCalendar);
    this.setState({
      time: timeFromCalendar
    });
  };
  // handleCalendarChange = value => {
  //   value.split(" ");
  //   let date = value[0];
  //   let time = value[1];
  //   //console.log("Date:", value[0], "Time:", value[1]);
  //   this.setState(
  //     {
  //       date: date,
  //       time: time
  //     },
  //     () => console.log("calendar date:", this.state.date)
  //   );
  // };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.state.playersReq.trim() &&
      this.state.cost.trim() &&
      this.state.pitchNo.trim() &&
      this.state.venue.trim() &&
      this.state.comments.trim()
    ) {
      this.props.onAddFixture(this.state);
      console.log(this.state);
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      date: "",
      time: "",
      playersReq: "",
      cost: "",
      pitchNo: "",
      venue: "",
      comments: ""
    });
  };
  render() {
    return (
      <div className="form-group">
        <form onSubmit={this.handleSubmit}>
          <Calendar
            callbackFromDateCalendar={this.fromDateCalendar}
            callbackFromTimePicker={this.fromTimePicker}
          />
          <input
            type="text"
            name="playersReq"
            onChange={this.handleInputChange}
            placeholder="Num of players needed"
            value=""
          />
          <input
            type="text"
            name="cost"
            onChange={this.handleInputChange}
            placeholder="Price to Play"
            value=""
          />
          <input
            type="text"
            name="pitchNo"
            onChange={this.handleInputChange}
            placeholder="Pitch No."
            value=""
          />
          <input
            type="text"
            name="venue"
            onChange={this.handleInputChange}
            placeholder="Venue"
            value=""
          />
          <textarea
            name="comments"
            onChange={this.handleInputChange}
            placeholder="Instructions/notes about game, i.e. skill level, phone numbers, possible lifts"
            value=""
          />
          <button type="submit" className="btn btn-success">
            Save Updated Fixture
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fixtures: state.fixture
  };
};

// map dispatch to props for getFixtureById
// const mapDispatchToProps = dispatch => {
//   return {
//     fetchAllApplications: () => {
//       dispatch(fetchAllApplications());
//     },
// };

export default connect(mapStateToProps)(UpdateGame);
