const express = require("express");
const router = express.Router();
const passport = require("passport");

const Fixture = require("../models/Fixture");
const User = require("../models/User");
const Application = require("../models/ApplicationForGame");
const { applicationEmail } = require("../utils/emailer");

// Routes for get all applications and for posting an application for a fixture and
// sending an email to the game poster
router.get("/applicationForGame", (req, res) => {
  Application.find().then(applications => {
    res.send(applications);
  });
});

router.post(
  "/apply",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let newApplication;
    let applicant;
    let applicantName;
    let id;
    let date;
    let time;
    let venue;
    let gamePoster;
    Application.findOne({
      $and: [{ game_id: req.body.game_id }, { applicant_id: req.user._id }]
    })
      .then(application => {
        if (application) {
          return res
            .status(302)
            .json({ message: "You have already applied to join this game" });
        } else {
          return Fixture.findOne({
            _id: req.body.game_id
          })
            .then(fixture => {
              return (gamePoster = fixture.user_id);
            })
            .then(() => {
              Application.create({
                applicant_id: req.body.applicant_id,
                applicant_name: req.body.applicant_name,
                game_id: req.body.game_id,
                gamePoster_id: req.body.gamePoster_id
              });
            })
            .then(dbResponse => {
              return (newApplication = dbResponse);
            })
            .then(() => {
              return User.findOne({ _id: req.body.applicant_id });
            })
            .then(user => {
              return (applicant = user.userName);
            })
            .then(() => {
              return Fixture.findOne({ _id: req.body.game_id });
            })
            .then(fixture => {
              return (
                (id = fixture.user_id),
                (date = fixture.date),
                (time = fixture.time),
                (venue = fixture.venue)
              );
            })
            .then(() => {
              return User.findOne({ _id: id });
            })
            .then(user => {
              applicationEmail(
                user.email,
                user.userName,
                applicant,
                date,
                time,
                venue
              );
              res.status(201).json({
                message: `Ok ${applicant}, you have applied to play in ${
                  user.userName
                }'s game. You will receive an email response soon.`
              });
            });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ message: "Cannot apply for this game, dunno why..." })
      );
  }
);

module.exports = router;
