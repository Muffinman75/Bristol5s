import React, { Component, PropTypes } from "react";
import team from "../img/five-a-side.jpg";
import footySocks from "../img/footy-socks.jpg";
import footySuits from "../img/footy-suits.png";

export default class Landing extends Component {
  render() {
    return (
      <section
        className="container section"
        id="photos"
        style={{ marginTop: "50px" }}
      >
        <div className="row">
          <div className="col s12 l5">
            <img src={team} alt="" className="responsive-img materialboxed" />
          </div>
          <div className="col s12 l6 offset-l1">
            <h2 className="indigo-text text-darken-4">Play 5 A-Side</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum at lacus congue, suscipit elit nec, tincidunt orci.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col s12 l5 offset-l1 push-l7">
            <img
              src={footySuits}
              alt=""
              className="responsive-img materialboxed"
            />
          </div>
          <div className="col s12 l6 offset-l1 pull-l5 right-align">
            <h2 className="indigo-text text-darken-4">Meet People</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum at lacus congue, suscipit elit nec, tincidunt orci.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col s12 l5">
            <img
              src={footySocks}
              alt=""
              className="responsive-img materialboxed"
            />
          </div>
          <div className="col s12 l6 offset-l1">
            <h2 className="indigo-text text-darken-4">Find Players</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum at lacus congue, suscipit elit nec, tincidunt orci.
            </p>
          </div>
        </div>
      </section>
    );
  }
}
Landing.propTypes = {};
