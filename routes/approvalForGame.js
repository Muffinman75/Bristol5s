const express = require("express");
const router = express.Router();
const passport = require("passport");

const Fixture = require("../models/Fixture");
const User = require("../models/User");
const Application = require("../models/ApplicationForGame");
const { approvalEmail, rejectionEmail } = require("../utils/emailer");

router.put(
  "/reject",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let gameId;
    let applicant;
    let email;
    let date;
    let time;
    let venue;
    console.log("Reject applicant for game:" + JSON.stringify(req.body));
    Application.findOneAndUpdate(
      {
        $and: [
          { game_id: req.body.fixtureID },
          { applicant_name: req.body.applicantName }
        ]
      },
      {
        $set: { archive: true }
      },
      {
        new: true
      }
    )
      .then(application => {
        gameId = application.game_id;
        console.log("Rejected Application:", JSON.stringify(application));
        return User.findOne({ _id: application.applicant_id });
      })
      .then(user => {
        console.log("Rejected Applicant:", user.userName);
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
        console.log("poobear", email, userName, applicant, date, time, venue);
        rejectionEmail(email, userName, applicant, date, time, venue);
        return res.status(200).json({ message: `email sent to ${applicant}` });
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
          { game_id: req.body.fixtureID },
          { applicant_name: req.body.applicantName }
        ]
      },
      {
        $set: {
          approved: true,
          archive: true
        }
      },
      {
        new: true
      }
    )
      .then(application => {
        gameId = req.body.fixtureID;
        console.log("Application approval status:", application.approved);
        return User.findOne({ _id: application.gamePoster_id });
      })
      .then(user => {
        applicant = req.body.applicantName;
        userName = user.userName;
        console.log("Game Poster Username:", userName);
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
        email = user.email;
        console.log("Applicants Email", user.email);
        return;
      })
      .then(() => {
        return Fixture.findOneAndUpdate(
          { _id: gameId },
          { $inc: { "fixture.playersReq": -1 } },
          { new: true }
        );
      })
      .then(fixture => {
        date = fixture.date;
        time = fixture.time;
        venue = fixture.venue;
        if (fixture.playersReq < 1) {
          fixture.update({ archive: true });
        }
        console.log("The Game in question:", fixture);
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
