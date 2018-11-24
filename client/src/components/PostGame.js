import React, { Component } from "react";
import Calendar from "./Calendar";

// import "bootstrap/dist/css/bootstrap.min.css";

export default class PostGame extends Component {
  render() {
    return (
      <div>
        <form className="form-group">
          <Calendar />
          <input
            type="text"
            name="playersReq"
            onChange={this.handleChange}
            placeholder="Num of players needed"
          />
          <input
            type="text"
            name="cost"
            onChange={this.handleChange}
            placeholder="Price to Play"
          />
          <input
            type="text"
            name="pitch"
            onChange={this.handleChange}
            placeholder="Pitch No."
          />
          <textarea
            name="comments"
            placeholder="Instructions/notes about game, i.e. skill level, phone numbers, possible lifts"
          />
        </form>
      </div>
    );
  }
}
