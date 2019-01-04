import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import { Redirect } from "react-router-dom";
// import classnames from "classnames";
import { fetchFixtureById, updateFixture } from "../actions/fixtures";
import Calendar from "./Calendar";

// import "bootstrap/dist/css/bootstrap.min.css";

class UpdateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixture: null
      //redirect: false
    };
    //console.log("props:", this.props, "state:", this.state);
    // create the stateeeeeeeeeeeeeeeeeeeeeeeeeeee object, with an empty fixture property
  }

  componentDidMount() {
    //this.props.fetchFixtureById(this.props.match.params.id);
    {
      this.props.fixtures.map(fixture => {
        if (fixture._id === this.props.match.params.id) {
          this.setState({
            fixture: fixture
          });
        }
      });
      console.log("props:", this.props, "state:", this.state);
    }
    // loop over this.props.fixtures to find the onnnnnnnnnnnnnne whose id matches params.id
    // setstate fixture: the matching fixutre
  }
  // componentDidMount that dispatches getFixtureById using this.props.match.params.id

  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   });
  // };
  //
  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to="/home" />;
  //   }
  // };

  handleInputChange = e => {
    let fixture = this.state.fixture;
    fixture[e.target.name] = e.target.value;
    this.setState({
      fixture: fixture
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(
      this.state.fixture.playersReq,
      typeof this.state.fixture.playersReq
    );
    if (
      this.state.fixture.date &&
      this.state.fixture.time &&
      this.state.fixture.playersReq &&
      this.state.fixture.cost &&
      this.state.fixture.pitchNo &&
      this.state.fixture.venue &&
      this.state.fixture.comments
    ) {
      this.props.onUpdateFixture(this.state.fixture); // todo update fixture
      alert("This Fixture Has Been Updated!");
      console.log(this.state.fixture);
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
    if (!this.state.fixture) {
      return (
        <div className="container">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="form-group">
        <form onSubmit={this.handleSubmit}>
          {/* <Calendar
            callbackFromDateCalendar={this.fromDateCalendar}
            callbackFromTimePicker={this.fromTimePicker}
          /> */}
          <div className="input-field">
            <i className="material-icons prefix">today</i>
            <input
              type="date"
              name="date"
              id="date"
              onChange={this.handleInputChange}
              defaultValue={"" + this.state.fixture.date + ""}
            />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">access_time</i>
            <input
              type="time"
              name="time"
              id="time"
              onChange={this.handleInputChange}
              defaultValue={"" + this.state.fixture.time + ""}
            />
          </div>
          <div className="input-field">
            <i className="material-icons prefix">person_add</i>
            <input
              id="playersReq"
              type="text"
              name="playersReq"
              onChange={this.handleInputChange}
              value={"" + this.state.fixture.playersReq + ""}
            />
            {/*<label htmlFor="playersReq">Num of Players Needed</label>*/}
          </div>
          <div className="input-field">
            <i className="material-icons prefix">euro_symbol</i>
            <input
              id="cost"
              type="text"
              name="cost"
              onChange={this.handleInputChange}
              value={"" + this.state.fixture.cost + ""}
            />
            {/*<label htmlFor="cost">Price to Play</label>*/}
          </div>
          <div className="input-field">
            <i className="material-icons prefix">filter_5</i>
            <input
              id="pitchNo"
              type="text"
              name="pitchNo"
              onChange={this.handleInputChange}
              value={"" + this.state.fixture.pitchNo + ""}
            />
            {/*<label htmlFor="pitchNo">Pitch No.</label>*/}
          </div>
          <div className="input-field">
            <i className="material-icons prefix">near_me</i>
            <input
              id="venue"
              type="text"
              name="venue"
              onChange={this.handleInputChange}
              value={"" + this.state.fixture.venue + ""}
            />
            {/*<label htmlFor="venue">Venue</label>*/}
          </div>
          <div className="input-field">
            <i className="material-icons prefix">message</i>
            <textarea
              id="comments"
              name="comments"
              onChange={this.handleInputChange}
              value={"" + this.state.fixture.comments + ""}
            />
            {/*<label htmlFor="comments"> Comments For Applicant</label>*/}
            <button type="submit" className="btn btn-success">
              <i className="material-icons right">chevron_right</i>Save Updated
              Fixture
            </button>
          </div>
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

//map dispatch to props for getFixtureById
const mapDispatchToProps = dispatch => {
  return {
    fetchFixtureById: () => {
      dispatch(fetchFixtureById());
    },
    onUpdateFixture: fixture => {
      dispatch(updateFixture(fixture));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateGame);
