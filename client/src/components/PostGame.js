import React, { Component } from "react";

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
      this.props.onAddFixture(this.state, (passed, response) => {
        if (passed) {
          alert("Success! Fixture Added!");
          this.handleReset();
          window.location.href = "/home";
        } else {
          alert(response);
        }
      });
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
        <h1 className="center headings light-blue-text darken-1">
          Please Fill In All Fixture Details
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12 l5 input-field">
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
            <div className="col s12 l5 input-field right">
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
          </div>
          <div className="row">
            <div className="col s12 l5 input-field">
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
            <div className="col s12 l5 input-field right">
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
          </div>
          <div className="row">
            <div className="col s12 l5 input-field">
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
            <div className="col s12 l5 input-field right">
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
          </div>
          <div className="row">
            <div className="col s12 l12 input-field">
              <i className="material-icons prefix">message</i>
              <textarea
                id="comments"
                name="comments"
                onChange={this.handleInputChange}
                value={this.state.comments}
                required
              />
              <label htmlFor="comments"> Comments For Player</label>
            </div>
          </div>
          <div className="center align">
            <button className="btn light-blue darken-1 waves">
              <i className="material-icons right">chevron_right</i>Add Fixture
            </button>
          </div>
        </form>
      </div>
    );
  }
}
