import React, { Component } from "react";
import PropTypes from "prop-types";
// import classnames from "classnames";

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

  // fromDateCalendar = dateFromCalendar => {
  //   console.log("Date From Calendar:", dateFromCalendar);
  //   this.setState({
  //     date: dateFromCalendar
  //   });
  // };
  //
  // fromTimePicker = timeFromCalendar => {
  //   console.log("Time From Calendar:", timeFromCalendar);
  //   this.setState({
  //     time: timeFromCalendar
  //   });
  // };
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
      this.state.date.trim() &&
      this.state.time.trim() &&
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
      <div className="form-group" style={{ marginTop: "50px" }}>
        <h1 className="center">Please Fill In All Fixture Details</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <i className="material-icons prefix">today</i>
            <input
              type="date"
              name="date"
              id="date"
              onChange={this.handleInputChange}
              value={this.state.date}
              required
            />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">access_time</i>
            <input
              type="time"
              name="time"
              id="time"
              onChange={this.handleInputChange}
              value={this.state.time}
              required
            />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">person_add</i>
            <input
              id="playersReq"
              type="number"
              name="playersReq"
              onChange={this.handleInputChange}
              value={this.state.playersReq}
              required
            />
            <label htmlFor="playersReq">Num of players needed</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">euro_symbol</i>
            <input
              id="cost"
              type="number"
              step="0.01"
              name="cost"
              onChange={this.handleInputChange}
              value={this.state.cost}
              required
            />
            <label htmlFor="cost">Price to Play</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">filter_5</i>
            <input
              id="pitchNo"
              type="number"
              name="pitchNo"
              onChange={this.handleInputChange}
              value={this.state.pitchNo}
              required
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
              required
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
              required
            />
            <label htmlFor="comments"> Comments For Player</label>
            <button className="btn btn-success">
              <i className="material-icons right">chevron_right</i>Add Fixture
            </button>
          </div>
        </form>
      </div>
    );
  }
}
