import React, { Component, PropTypes } from "react";

export default class PostApplication extends Component {
  constructor(props) {
    super(props);
    let user_id = localStorage.getItem("user_id");
    let user_name = localStorage.getItem("user_name");
    this.setState = {
      applicant_id: user_id,
      applicant_name: user_name,
      game_id: this.props.fixture._id,
      gamePoster_id: this.props.fixture.user_id
    };
  }

  render() {
    return <div>MyComponent</div>;
  }
}
PostApplication.propTypes = {};
