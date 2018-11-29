const express = require("express");
const router = express.Router();
const passport = require("passport");

const Fixture = require("../models/Fixture");
const User = require("../models/User");
const Application = require("../models/ApplicationForGame");
const { newEmail } = require("../utils/emailer");

router.get("/fixtures", (req, res) => {
  Fixture.find().then(fixtures => {
    res.send(fixtures);
  });
});

router.get("/fixtures/:id", (req, res) => {
  Fixture.findOne({ _id: req.params.id }).then(fixtures => {
    res.send(fixtures);
  });
});

router.post(
  "/apply",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let newApplication;
    console.log("Apply for game:" + JSON.stringify(req.body));
    Application.findOne({
      $and: [{ game_id: req.body.game_id }, { user_id: req.user._id }]
    })
      .then(application => {
        console.log("inside the then:", application);
        if (application) {
          return res
            .status(302)
            .json({ message: "You have already applied to join this game" });
        } else {
          console.log("now I'm here!");
          Application.create({
            user_id: req.user._id,
            game_id: req.body.game_id,
            approved: false
          })
            .then(dbResponse => {
              console.log("application created");
              return (newApplication = dbResponse);
            })
            .then(() => {
              console.log("fixture findOne", req.body.game_id);
              Fixture.findOne({ _id: req.body.game_id });
            })
            .then(fixture => {
              console.log(
                "fixture after application created:",
                req.body.user_id
              );
              User.findOne({ _id: req.body.user_id });
            })
            .then(dbResponse => {
              console.log("Before Email:");
              newEmail(req.user.userName);
              console.log("After Email:");
              res.status(201).json({ dbResponse });
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
