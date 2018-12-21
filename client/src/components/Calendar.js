import React, { Component } from "react";
import moment from "moment";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      fixtureDate: moment(),
      date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      time: "12:00"
    };
  }

  /*handleChange(e) {
    // this.setState({
    //   fixtureDate: date
    // });
    let userDate = "" + e._d + "";
    console.log("e:", e);
    console.log("e._d:", e._d);
    let value = userDate.split("T");
    console.log("value:", value);
    //let timeDatePieces = value.split(" ");
    let date =
      e._d.getFullYear() + "/" + (e._d.getMonth() + 1) + "/" + e._d.getDate();
    //console.log("Date:", value[0], "Time:", value[1]);
    this.props.callbackFromCalendar("callbackFromCalendar:", date);
    console.log("state:", this.state);
}*/

  handleDateChange(e) {
    console.log(e.target.value);
    this.setState({ date: e.target.value });
    this.props.callbackFromDateCalendar(e.target.value);
  }

  handleTimeChange(e) {
    console.log(e.target.value);
    this.setState({ time: e.target.value });
    this.props.callbackFromTimePicker(e.target.value);
  }

  render() {
    return (
      <div className="container">
        <h3>Select Fixture Date/Time</h3>
        <div className="form-group">
          <label>Select Date & Time: </label>
          <input
            type="date"
            name="date"
            value={this.state.date}
            min="2018-12-13"
            max="2019-12-13"
            onChange={e => this.handleDateChange(e)}
          />
          <input
            type="time"
            name="time"
            min="7:00"
            max="20:00"
            value={this.state.time}
            onChange={e => this.handleTimeChange(e)}
          />
          {/*<DatePicker
            selected={this.state.fixtureDate}
            onChange={e => this.handleChange(e)}
            name="date/time"
            minDate={new Date()}
            dateFormat="DD/MM/YYYY"
            showTimeSelect
            timeFormat="HH:mm"
            timeCaption="Time"
            timeIntervals={15}
            className="green-border"
            shouldCloseOnSelect={false}
            withPortal={true}
            autoOk={true}
        /> */}
        </div>
      </div>
    );
  }
}
