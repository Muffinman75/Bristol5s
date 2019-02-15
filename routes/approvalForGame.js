const express = require("express");
const router = express.Router();
const passport = require("passport");

const Fixture = require("../models/Fixture");
const User = require("../models/User");
const Application = require("../models/ApplicationForGame");
const { approvalEmail, rejectionEmail } = require("../utils/emailer");

// Endpoints to either reject or accept an applicant for the game and sending the appropriate emails
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
        return User.findOne({ _id: application.applicant_id });
      })
      .then(user => {
        return (applicant = req.body.applicantName), (email = user.email);
      })
      .then(() => {
        return Fixture.findOne({ _id: gameId });
      })
      .then(fixture => {
        return (
          (date = fixture.date), (time = fixture.time), (venue = fixture.venue)
        );
      })
      .then(() => {
        rejectionEmail(email, applicant, date, time, venue);
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
        return User.findOne({ _id: application.gamePoster_id });
      })
      .then(user => {
        applicant = req.body.applicantName;
        userName = user.userName;
        return (userName = user.userName);
      })
      .then(() => {
        return Application.findOne({
          $and: [
            { game_id: req.body.fixtureID },
            { applicant_name: req.body.applicantName }
          ]
        });
      })
      .then(application => {
        return User.findOne({ _id: application.applicant_id });
      })
      .then(user => {
        email = user.email;
        return;
      })
      .then(() => {
        return Fixture.findOne({ _id: gameId });
      })
      .then(fixture => {
        date = fixture.date;
        time = fixture.time;
        venue = fixture.venue;
        fixture.playersReq--;
        if (fixture.playersReq < 1) {
          fixture.updateOne({ archive: true });
          fixture.save();
        }
        fixture.save();
      })
      .then(() => {
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
