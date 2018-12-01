const express = require("express");
const router = express.Router();
const passport = require("passport");

const Fixture = require("../models/Fixture");
const User = require("../models/User");
const Application = require("../models/ApplicationForGame");
const { approvalEmail, rejectionEmail } = require("../utils/emailer");

router.delete(
  "/reject",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let gameId;
    let applicant;
    let email;
    let date;
    let time;
    let venue;
    console.log("Approve applicant for game:" + JSON.stringify(req.body));
    Application.findOneAndDelete({
      $and: [
        { gamePoster_id: req.body.gamePoster_id },
        { applicant_id: req.body.applicant_id }
      ]
    })
      .then(application => {
        gameId = application.game_id;
        console.log("Application:", JSON.stringify(application));
        return User.findOne({ _id: application.applicant_id });
      })
      .then(user => {
        console.log("Applicant:", user.userName);
        return (applicant = user.userName), (email = user.email);
      })
      .then(() => {
        return Fixture.findOne({ _id: gameId });
      })
      .then(fixture => {
        console.log("Game Rejected for:", JSON.stringify(fixture));
        return (
          (date = fixture.date), (time = fixture.time), (venue = fixture.venue)
        );
      })
      .then(() => {
        console.log("Sending rejection email to:", applicant, "at:", email);
        rejectionEmail(email, userName, applicant, date, time, venue);
        res.status(200).json({ message: `email sent to ${applicant}` });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Cannot reject this player...dunno why" });
      });
  }
);

router.put(
  "/approve",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let gameId;
    let applicant;
    let email;
    let date;
    let time;
    let venue;
    console.log("Approve applicant for game:" + JSON.stringify(req.body));
    return Application.findOneAndUpdate(
      {
        $and: [
          { gamePoster_id: req.body.gamePoster_id },
          { applicant_id: req.body.applicant_id }
        ]
      },
      {
        $set: {
          approved: true
        }
      },
      {
        new: true
      }
    )
      .then(application => {
        gameId = application.game_id;
        console.log("Application approval status:", application.approved);
        return application;
      })
      .then(application => {
        console.log("Game Poster Id:", application.gamePoster_id);
        return User.findOne({ _id: application.gamePoster_id });
      })
      .then(user => {
        console.log("Game Poster Username:", user.userName);
        return (userName = user.userName);
      })
      .then(() => {
        return Application.findOne({});
      })
      .then(application => {
        console.log("Applicant Id:", application.applicant_id);
        return User.findOne({ _id: application.applicant_id });
      })
      .then(user => {
        console.log("Applicants Email", user.email);
        return (email = user.email), (applicant = user.userName);
      })
      .then(() => {
        return Fixture.findOne({ _id: gameId });
      })
      .then(fixture => {
        console.log("The Game in question:", fixture);
        return (
          (date = fixture.date), (time = fixture.time), (venue = fixture.venue)
        );
      })
      .then(() => {
        console.log("Sending approval email to:", applicant, "at:", email);
        approvalEmail(email, userName, applicant, date, time, venue);
        res.status(201).json({ message: `email sent to ${applicant}` });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Cannot approve this player...dunno why" });
      });
  }
);

module.exports = router;
