const SGmail = require("@sendgrid/mail");
require("dotenv").config();
SGmail.setApiKey(process.env.SENDGRID_API_KEY);

// Sendgrid emailer for all my email needs!
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

    text: `Hi there ${applicant}! Get that kit washed! ${name} has accepted your request to play in their game on ${date} (year-month-day!). See you there at ${time}!
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

function rejectionEmail(email, applicant, date, time, venue) {
  console.log("inside rjemail:");
  const message = {
    to: email, //email variable

    from: {
      email: "manojmodhwadia@outlook.com",
      name: "Manoj Modhwadia"
    },

    text: `Hi there ${applicant}, unfortunately you have not been selected to play in this game on ${date}
           at ${time}
           Venue: ${venue}
           But there are other games to choose from, so chin up and get back in there!!
           Please login to Bristol5s to find another game to play in.`,

    subject: "Please apply for a different 5-a-side game"
  };

  SGmail.send(message).then(sent => {
    if (sent) {
      console.log("message:", message);
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
