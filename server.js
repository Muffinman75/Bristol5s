const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const config = require("./db");
const users = require("./routes/users");
const fixtures = require("./routes/fixtures");
const applicationForGame = require("./routes/applicationForGame");

mongoose
  .connect(
    config.DB,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

// Configure Nodemailer SendGrid Transporter
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY // SG password
    }
  })
);

//sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// Create Email Options
const options = {
  to: "manojmodhwadia@outlook.com",
  from: "slenderprince75@gmail.com", // Totally up to you
  subject: "Sending with SendGrid is Fun",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>" // For sending HTML emails
};

sgMail.send(options);

// Send Email
// transporter.sendEmail(options, (err, resp) => {
//   if (err) {
//     // handle error
//   } else {
//     // handle success
//   }
// });

const app = express();
app.use(passport.initialize());
require("./passport")(passport);
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/fixtures", fixtures);
app.use("/api/applications", applicationForGame);

app.get("/", function(req, res) {
  res.send("hello");
});

let server;

function runServer() {
  const port = process.env.PORT || 8000;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

// const PORT = process.env.PORT || 8000;
//
// app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}`);
// });
