const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FixtureSchema = new Schema({
  user_id: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  playersReq: { type: Number, required: true },
  cost: { type: Number, required: true },
  venue: { type: String, required: true },
  pitchNo: { type: Number, required: true },
  comments: { type: String, default: "" },
  archive: { type: Boolean, default: false }
});

const Fixture = mongoose.model("Fixtures", FixtureSchema);

module.exports = Fixture;
