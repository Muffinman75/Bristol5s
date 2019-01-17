import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authentication";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    console.log("loginprops", this.props);
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      window.location.href = "/home";
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container form-group" style={{ marginTop: "50px" }}>
        <h2
          className="center headings light-blue-text darken-1"
          style={{ marginBottom: "40px" }}
        >
          Login
        </h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-field ">
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
          <div className="input-field ">
            <i className="material-icons prefix">lock_outline</i>
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
          <div className="form-group center-align">
            <button type="submit" className="btn light-blue darken-1 waves">
              Login User
            </button>
            <h2 className="flow-text center-align">Test User Login Details</h2>
            <p className="flow-text center-align">
              Email: slenderprince75@gmail.com
            </p>
            <p className="flow-text center-align">
              Email: tstalcupjr@gmail.com
            </p>
            <p className="flow-text center-align">Password: 123456</p>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
