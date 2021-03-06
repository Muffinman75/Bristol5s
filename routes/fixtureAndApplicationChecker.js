const express = require("express");
const router = express.Router();
const passport = require("passport");
const cron = require("node-cron");

const Fixture = require("../models/Fixture");

// Archives old games
router.get("/fixtureAndApplicationChecker", (req, res) => {
  let dateToday = new Date();
  dateToday.getFullYear() +
    "/" +
    (dateToday.getMonth() + 1) +
    "/" +
    dateToday.getDate();
  Fixture.update({ date: { $lt: dateToday } }, { archive: true }).then(
    fixture => {
      ApplicationForGame.update({ game_id: fixture._id }, { archive: true });
      return res
        .status(200)
        .json({ message: "Old fixtures and applications archived" });
    }
  );
  res.send(200);
});

module.exports = router;
