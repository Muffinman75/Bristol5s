import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let main = this.state.startDate;
    console.log(main.format("L"));
  }

  render() {
    return (
      <div className="container">
        <h3>Select Fixture Date/Time</h3>
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="form-group" onSubmit={this.handleSubmit}>
          <label>Select Date: </label>
          <DatePicker
            // customInput={<Calendar />}
            selected={this.state.startDate}
            onChange={this.handleChange}
            // calendarContainer={MyContainer}
            name="startDate"
            dateFormat="LLL"
            showTimeSelect
            timeFormat="HH:mm"
            timeCaption="time"
            timeIntervals={15}
            className="green-border"
            shouldCloseOnSelect={false}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success">Add Fixture</button>
        </div>
        {/* </form> */}
      </div>
    );
  }
}
