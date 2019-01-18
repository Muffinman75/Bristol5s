import React, { Component } from "react";
import team from "../img/five-a-side.jpg";
import footySocks from "../img/footy-socks.jpg";
import footySuits from "../img/footy-suits.png";

export default class Landing extends Component {
  render() {
    return (
      <section className="container section" id="photos">
        <h1
          className="center headings light-blue-text darken-1"
          style={{ marginTop: "50px" }}
        >
          Welcome To Bristol5s!
        </h1>
        <div className="col s12 l8">
          <img
            src={team}
            alt="5-a-side footballers"
            className="responsive-img materialboxed center-align"
          />
        </div>
        <div className="col s12 l6 ">
          <h2 className="indigo-text text-darken-4 center-align">
            Play 5 A-Side
          </h2>
          <p className="center-align flow-text">
            Love playing 5-a-side football? Live in and around the Bristol area?
            Register for a free account now and apply to play! You could be
            pulling yer boots on and playing tomorrow!
          </p>
        </div>
        <div className="col s12 l8 ">
          <img
            src={footySuits}
            alt="men in suits playing football"
            className="responsive-img materialboxed center-align"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col s12 l6 ">
          <h2 className="indigo-text text-darken-4 center-align">
            Meet People
          </h2>
          <p className="center-align flow-text">
            Want to meet other footy loving loons? Share your passion with
            others! No pint tastes as good as the post-match pint. Fact. (What!?
            Could be non-alcoholic!) Join now! Get involved!
          </p>
        </div>
        <div className="col s12 l8">
          <img
            src={footySocks}
            alt="players legs and football"
            className="responsive-img materialboxed center-align"
          />
        </div>
        <div className="col s12 l6">
          <h2 className="indigo-text text-darken-4 center-align">
            Find Players
          </h2>
          <p className="center-align flow-text">
            Do you organise a regular game? Sick of buffoons (or Buffons!) with
            weak excuses not showing up? Fill in a couple of quick details about
            your game (time, place, cost etc.) and have the pick of our roster
            of lovely footballers all chomping at the bit to play in your game!
          </p>
        </div>
      </section>
    );
  }
}
