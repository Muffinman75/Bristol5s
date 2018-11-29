const express = require("express");
const router = express.Router();
const passport = require("passport");

const Fixture = require("../models/Fixture");
const User = require("../models/User");
const Application = require("../models/ApplicationForGame");
const { newEmail } = require("../utils/emailer");

router.post(
  "/approve",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

module.exports = router;
