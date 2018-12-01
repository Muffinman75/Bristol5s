const express = require("express");
const router = express.Router();
const passport = require("passport");

const Fixture = require("../models/Fixture");
const User = require("../models/User");
const validateAddGameInput = require("../validation/add-game");

router.get(
  "/display-games",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("getAllFixtures:" + JSON.stringify(req.body));

    Fixture.find({}).then(fixtures => {
      if (!fixtures) {
        return res.status(400).json({ message: "No fixtures to see here" });
      } else {
        return res.status(200).json(fixtures);
      }
    });
  }
);

router.get(
  "/display-games/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("getAllFixturesById:" + JSON.stringify(req.body));

    Fixture.find({ user_id: req.user.id }).then(fixtures => {
      if (!fixtures) {
        return res
          .status(400)
          .json({ message: "This user has not posted any games" });
      } else {
        return res.status(200).json(fixtures);
      }
    });
  }
);

router.post(
  "/add-game",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("post:" + JSON.stringify(req.body));
    const { errors, isValid } = validateAddGameInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Fixture.findOne({
      user_id: req.user.id,
      date: req.body.date,
      time: req.body.time
    }).then(fixture => {
      if (fixture) {
        return res.status(400).json({
          message: "One user cannot have two fixtures at the same time"
        });
      } else {
        Fixture.create({
          user_id: req.user.id,
          date: req.body.date,
          time: req.body.time,
          playersReq: parseInt(req.body.playersReq),
          cost: parseFloat(req.body.cost),
          venue: req.body.venue,
          pitchNo: parseInt(req.body.pitchNo),
          comments: req.body.comments
        })
          .then(dbResponse => {
            return res.status(201).json(dbResponse);
          })
          .catch(err =>
            res.status(500).json({ message: "Cannot create fixture" })
          );
      }
    });
  }
);

router.put(
  "/update-game",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("post:" + JSON.stringify(req.body));
    const { errors, isValid } = validateAddGameInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Fixture.findOneAndUpdate(
      { user_id: req.body.user_id },
      {
        $set: {
          date: req.body.date,
          time: req.body.time,
          playersReq: parseInt(req.body.playersReq),
          cost: parseFloat(req.body.cost),
          venue: req.body.venue,
          pitchNo: parseInt(req.body.pitchNo),
          comments: req.body.comments
        }
      }
    )
      .then(fixture => {
        if (fixture) {
          console.log("Fixture updated to this:", req.body);
          return res.status(200).json({ message: "Updated this fixture" });
        }
        console.log("No fixture to update");
        return res.status(404).json({ message: "This fixture does not exist" });
      })
      .catch(err => res.status(500).json({ message: "Cannot update fixture" }));
  }
);

router.delete(
  "/remove-game",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Fixture.findOneAndDelete({ fixture_id: req.body._id })
      .then(fixture => {
        if (fixture) {
          console.log("This fixture has been deleted:", req.body);
          return res
            .status(201)
            .json({ message: "This fixture has now been deleted" });
        }
        console.log("No fixture to delete:", req.body);
        return res
          .status(404)
          .json({ message: "Cannot delete this fixture, it does not exist" });
      })
      .catch(err => res.status(500).json({ message: "Cannot remove fixture" }));
  }
);

module.exports = router;
