const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");

const Fixture = require("../models/Fixture");
const User = require("../models/User");
const validateAddGameInput = require("../validation/add-game");

// Authenticated CRUD operations for fixtures
router.get(
  "/display-games",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Fixture.find({ archive: false }).then(fixtures => {
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
    Fixture.find({ $and: [{ user_id: req.user.id }, { archive: false }] }).then(
      fixtures => {
        if (!fixtures) {
          return res
            .status(400)
            .json({ message: "This user has not posted any games" });
        } else {
          return res.status(200).json(fixtures);
        }
      }
    );
  }
);

router.post(
  "/add-game",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Fixture.findOne({
      user_id: req.user.id,
      date: req.body.date,
      time: req.body.time,
      archive: false
    })
      .then(fixture => {
        if (fixture) {
          return res.status(400).json({
            message: "One user cannot have two fixtures at the same time"
          });
        } else {
          let dateTimeObj = new Date();
          let fullDateTimeToday = JSON.stringify(dateTimeObj);
          let datePieces = fullDateTimeToday.split("T");
          let dateToday = datePieces[0].replace(/['"]+/g, "");
          function compareDates(d1, d2) {
            var parts = d1.split("-");
            var d1 = Number(parts[0] + parts[1] + parts[2]);
            parts = d2.split("-");
            var d2 = Number(parts[0] + parts[1] + parts[2]);
            return d1 < d2;
          }
          if (compareDates(dateToday, req.body.date) === true) {
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
          } else {
            res
              .status(400)
              .json({ message: "Cannot add a fixture that is in the past" });
          }
        }
      })
      .catch(err => {
        res.send(500).json({ message: "Cannot find fixture...dunno why" });
      });
  }
);

router.put(
  "/update-game",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let dateTimeObj = new Date();
    let fullDateTimeToday = JSON.stringify(dateTimeObj);
    let datePieces = fullDateTimeToday.split("T");
    let dateToday = datePieces[0].replace(/['"]+/g, "");
    function compareDates(d1, d2) {
      var parts = d1.split("-");
      var d1 = Number(parts[0] + parts[1] + parts[2]);
      parts = d2.split("-");
      var d2 = Number(parts[0] + parts[1] + parts[2]);
      return d1 < d2;
    }
    if (compareDates(dateToday, req.body.date) === true) {
      Fixture.update(
        { _id: req.body.id },
        {
          $set: {
            date: req.body.date,
            time: req.body.time,
            playersReq: parseInt(req.body.playersReq),
            cost: parseFloat(req.body.cost),
            pitchNo: parseInt(req.body.pitchNo),
            venue: req.body.venue,
            comments: req.body.comments
          }
        }
      )
        .then(fixture => {
          if (fixture) {
            return res.sendStatus(200);
          }
          return res
            .status(404)
            .json({ message: "This fixture does not exist" });
        })
        .catch(err =>
          res.status(500).json({ message: "Cannot update fixture" })
        );
    } else {
      return res
        .status(400)
        .json({ message: "Cannot change fixture date to one in the past" });
    }
  }
);

router.put(
  "/remove-game",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Fixture.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: { archive: true }
      }
    )
      .then(fixture => {
        if (fixture) {
          return res
            .status(201)
            .json({ message: "This fixture has now been removed" });
        }
        return res
          .status(404)
          .json({ message: "Cannot remove this fixture, it does not exist" });
      })
      .catch(err => res.status(500).json({ message: "Cannot remove fixture" }));
  }
);

module.exports = router;
