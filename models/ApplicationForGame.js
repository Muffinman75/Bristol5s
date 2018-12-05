const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicant_id: { type: String, required: true },
  game_id: { type: String, required: true },
  gamePoster_id: { type: String, required: true },
  approved: { type: Boolean, default: false },
  archive: { type: Boolean, default: false }
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
