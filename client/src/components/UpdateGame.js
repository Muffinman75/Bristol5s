import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFixtureById, updateFixture } from "../actions/fixtures";

class UpdateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixture: null
    };
  }

  componentDidMount() {
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
  }

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
      this.props.onUpdateFixture(this.state.fixture, (passed, response) => {
        if (passed) {
          alert("This Fixture Has Been Updated!");
          this.props.history.push("/home");
        } else {
          alert(response);
        }
      }); // todo update fixture
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
                defaultValue={"" + this.state.fixture.date + ""}
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
                defaultValue={"" + this.state.fixture.time + ""}
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
                value={"" + this.state.fixture.playersReq + ""}
                required
              />
              {/*<label htmlFor="playersReq">Num of Players Needed</label>*/}
            </div>
            <div className="col s12 l5 input-field right">
              <i className="material-icons prefix">euro_symbol</i>
              <input
                id="cost"
                type="number"
                name="cost"
                step="0.01"
                onChange={this.handleInputChange}
                value={"" + this.state.fixture.cost + ""}
                required
              />
              {/*<label htmlFor="cost">Price to Play</label>*/}
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
                value={"" + this.state.fixture.pitchNo + ""}
                required
              />
              {/*<label htmlFor="pitchNo">Pitch No.</label>*/}
            </div>
            <div className="col s12 l5 input-field right">
              <i className="material-icons prefix">near_me</i>
              <input
                id="venue"
                type="text"
                name="venue"
                onChange={this.handleInputChange}
                value={"" + this.state.fixture.venue + ""}
                required
              />
              {/*<label htmlFor="venue">Venue</label>*/}
            </div>
          </div>
          <div className="row">
            <div className="col s12 l12 input-field">
              <i className="material-icons prefix">message</i>
              <textarea
                id="comments"
                name="comments"
                onChange={this.handleInputChange}
                value={"" + this.state.fixture.comments + ""}
              />
              {/*<label htmlFor="comments"> Comments For Applicant</label>*/}
            </div>
          </div>
          <div className="center-align" style={{ "margin-bottom": "15px" }}>
            <button type="submit" className="btn light-blue darken-1 waves">
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

const mapDispatchToProps = dispatch => {
  return {
    fetchFixtureById: () => {
      dispatch(fetchFixtureById());
    },
    onUpdateFixture: (fixture, cb) => {
      dispatch(updateFixture(fixture, cb));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateGame);
