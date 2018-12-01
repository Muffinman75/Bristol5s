const SGmail = require("@sendgrid/mail");
require("dotenv").config();
SGmail.setApiKey(process.env.SENDGRID_API_KEY);

function applicationEmail(email, name, applicant, date, time, venue) {
  const message = {
    to: email, //email variable

    from: {
      email: "manojmodhwadia@outlook.com",
      name: "Manoj Modhwadia"
    },

    text: `Hi there ${name}, ${applicant} wishes to play in your game on ${date} at ${time}.
           Venue: ${venue}
           Please visit Bristol5s for more details and to accept or reject ${applicant} for your game.`,

    subject: "Someone wants to play in your game!"
  };

  SGmail.send(message).then(sent => {
    if (sent) {
      console.log(message);
    } else {
      console.log("message not sent");
    }
  });
}

function approvalEmail(email, name, applicant, date, time, venue) {
  const message = {
    to: email, //email variable

    from: {
      email: "manojmodhwadia@outlook.com",
      name: "Manoj Modhwadia"
    },

    text: `Hi there ${applicant}, ${name} wishes you to play in their game on ${date} at ${time}.
           Venue: ${venue}
           Please visit Bristol5s for more details.`,

    subject: "You have been accepted for a 5-a-side game"
  };

  SGmail.send(message).then(sent => {
    if (sent) {
      console.log(message);
    } else {
      console.log("message not sent");
    }
  });
}

function rejectionEmail(email, name, applicant, date, time, venue) {
  const message = {
    to: email, //email variable

    from: {
      email: "manojmodhwadia@outlook.com",
      name: "Manoj Modhwadia"
    },

    text: `Hi there ${applicant}, unfortunately you have not been selected to play in the game on ${date}
           at ${time}.
           Venue: ${venue}
           Please login to Bristol5s to find another game to play in.`,

    subject: "Please apply for a different 5-a-side game"
  };

  SGmail.send(message).then(sent => {
    if (sent) {
      console.log(message);
    } else {
      console.log("message not sent");
    }
  });
}

module.exports = {
  applicationEmail,
  approvalEmail,
  rejectionEmail
};
