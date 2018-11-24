const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddGameInput(data) {
  console.log("validateAddGameInput:" + JSON.stringify(data));
  let errors = {};
  data.fixtureDetails = !isEmpty(data.fixtureDetails)
    ? data.fixtureDetails
    : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.time = !isEmpty(data.time) ? data.time : "";
  data.playersReq = !isEmpty(data.playersReq) ? data.playersReq : "";
  data.cost = !isEmpty(data.cost) ? data.cost : "";
  data.pitchNo = !isEmpty(data.pitchNo) ? data.pitchNo : "";
  data.comments = !isEmpty(data.comments) ? data.comments : "";

  if (Validator.isEmpty(data.time)) {
    errors.date = "Time is required";
  }

  if (Validator.isBefore(data.date)) {
    errors.date = "Date of fixture cannot be in the past";
  }

  if (!Validator.isNumeric(data.playersReq)) {
    errors.playersReq = "Players required must be a number";
  }

  if (Validator.isEmpty(data.playersReq)) {
    errors.playersReq = "Please fill in number of players required";
  }

  if (!Validator.isCurrency(data.cost)) {
    errors.cost = "Please enter cost in the format of '0.00' ";
  }

  if (Validator.isEmpty(data.cost)) {
    errors.cost = "Cost per player is required";
  }

  if (Validator.isEmpty(data.venue)) {
    errors.venue = "Venue is required";
  }

  if (!Validator.isNumeric(data.pitchNo)) {
    errors.pitchNo = "Pitch No. should be a number";
  }

  if (Validator.isEmpty(data.pitchNo)) {
    errors.pitchNo = "Pitch number is required";
  }
  console.log(errors);
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
