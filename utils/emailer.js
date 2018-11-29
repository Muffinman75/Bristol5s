require("dotenv").config();

const SGmail = require("@sendgrid/mail");
SGmail.setApiKey(process.env.SENDGRID_API_KEY);

function newEmail(email, name, applicant, date, time) {
  const message = {
    to: email, //email variable

    from: {
      email: "Bristol5s@doNotReply.com",
      name: "Muffinman"
    },

    message: `Hi there, ${name}, ${applicant} wishes to play in your game on ${date} at ${time}. 
              Please visit Bristol5s for more details and to accept or reject ${name} for your game`,

    subject: "Someone wants to play in your game!"
  };

  SGmail.send(message).then(sent => {
    // Awesome Logic to check if mail was sent
  });
}

module.exports = {
  newEmail
};
