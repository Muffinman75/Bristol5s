import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class PostedGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtures: [],
      store: []
    };
  }

  componentDidMount() {
    axios
      .get(`localhost:8000/api/fixtures/display-games/${this.user._id}`)
      .then(res => {
        this.setState({});
      });
  }

  render() {
    return (
      <React.Fragment>
        <tbody>
          {this.state.fixtures.map(fixture => (
            <tr>
              {" "}
              <td>{fixture.playersReq}</td> <td>{fixture.cost}</td>{" "}
              <td>{fixture.pitch}</td> <td>{fixture.comments}</td>{" "}
            </tr>
          ))}
        </tbody>
      </React.Fragment>
    );
  }
}
