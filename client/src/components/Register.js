import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../actions/authentication";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      userName: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container" style={{ marginTop: "50px" }}>
        <h2 className="center" style={{ marginBottom: "40px" }}>
          Registration
        </h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group input-field">
            <i className="material-icons prefix">person_pin</i>
            <input
              id="userName"
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.userName
              })}
              name="userName"
              onChange={this.handleInputChange}
              value={this.state.userName}
            />
            <label htmlFor="userName">Username</label>
            {errors.userName && (
              <div className="invalid-feedback" style={{ color: "red" }}>
                {errors.userName}
              </div>
            )}
          </div>
          <div className="form-group input-field">
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              type="email"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email
              })}
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            <label htmlFor="email">Email</label>
            {errors.email && (
              <div className="invalid-feedback" style={{ color: "red" }}>
                {errors.email}
              </div>
            )}
          </div>
          <div className="form-group input-field">
            <i className="material-icons prefix">lock_open</i>
            <input
              id="password"
              type="password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password
              })}
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <div className="invalid-feedback" style={{ color: "red" }}>
                {errors.password}
              </div>
            )}
          </div>
          <div className="form-group input-field">
            <i className="material-icons prefix">lock_outline</i>
            <input
              id="password_confirm"
              type="password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password_confirm
              })}
              name="password_confirm"
              onChange={this.handleInputChange}
              value={this.state.password_confirm}
            />
            <label htmlFor="password_confirm">Confirm Password</label>
            {errors.password_confirm && (
              <div className="invalid-feedback" style={{ color: "red" }}>
                {errors.password_confirm}
              </div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
