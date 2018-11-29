const {SG_API_KEY} = ()

const SGmail = require("@sendgrid/mail");
SGmail.setApiKey(
  SG_API_KEY
);

function newEmail(name) {
  const message = {
    to: "manojmodhwadia@outlook.com", //email variable

    from: {
      email: "slenderprince75@gmail.com",
      name: "Muffinman"
    },

    message: `Hi there, ${name}`,

    subject: "This is a test Email"
  };

  SGmail.send(message).then(sent => {
    // Awesome Logic to check if mail was sent
  });
}

module.exports = {
  newEmail
};
