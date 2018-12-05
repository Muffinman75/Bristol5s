const express = require("express");
const router = express.Router();
const passport = require("passport");
const cron = require("node-cron");

const Fixture = require("../models/Fixture");

router.get("/fixtureAndApplicationChecker", (req, res) => {
  let dateToday = new Date();
  console.log("Todays Date:", dateToday);
  dateToday.getDate() +
    "/" +
    (dateToday.getMonth() + 1) +
    "/" +
    dateToday.getFullYear();
  Fixture.update({ date: { $lt: dateToday } }, { archive: true }).then(() =>
    res.sendStatus(200)
  );
});

module.exports = router;
