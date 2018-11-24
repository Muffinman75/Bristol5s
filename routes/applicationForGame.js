const express = require("express");
const router = express.Router();
const passport = require("passport");

const Fixture = require("../models/Fixture");
const User = require("../models/User");
const Application = require("../models/ApplicationForGame");

router.post(
  "/apply",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
          }).then(dbResponse => {
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
