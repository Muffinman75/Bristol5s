const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddGameInput(data) {
  console.log("validateAddGameInput:" + JSON.stringify(data));
  let errors = {};
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
