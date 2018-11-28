const SGmail = require("@sendgrid/mail");
SGmail.setApiKey(
  "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"
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
