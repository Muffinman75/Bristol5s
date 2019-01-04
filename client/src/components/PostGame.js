import React, { Component } from "react";
import PropTypes from "prop-types";
// import classnames from "classnames";
import Calendar from "./Calendar";

// import "bootstrap/dist/css/bootstrap.min.css";

export default class PostGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "",
      playersReq: "",
      cost: "",
      pitchNo: "",
      venue: "",
      comments: ""
    };
  }

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
      alert("Success! Fixture Added!");
      console.log(this.state);
      this.handleReset();
      window.location.href = "/home";
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
          <div className="input-field">
            <i className="material-icons prefix">person_add</i>
            <input
              id="playersReq"
              type="text"
              name="playersReq"
              onChange={this.handleInputChange}
              value={this.state.playersReq}
            />
            <label htmlFor="playersReq">Num of players needed</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">euro_symbol</i>
            <input
              id="cost"
              type="text"
              name="cost"
              onChange={this.handleInputChange}
              value={this.state.cost}
            />
            <label htmlFor="cost">Price to Play</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">filter_5</i>
            <input
              id="pitchNo"
              type="text"
              name="pitchNo"
              onChange={this.handleInputChange}
              value={this.state.pitchNo}
            />
            <label htmlFor="pitchNo">Pitch No.</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">near_me</i>
            <input
              id="venue"
              type="text"
              name="venue"
              onChange={this.handleInputChange}
              value={this.state.venue}
            />
            <label htmlFor="venue">Venue</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">message</i>
            <textarea
              id="comments"
              name="comments"
              onChange={this.handleInputChange}
              value={this.state.comments}
            />
            <label htmlFor="comments"> Comments For Applicant</label>
            <button className="btn btn-success">
              <i className="material-icons right">chevron_right</i>Add Fixture
            </button>
          </div>
        </form>
      </div>
    );
  }
}
