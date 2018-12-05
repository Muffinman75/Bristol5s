const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const cron = require("node-cron");

const config = require("./db");
const users = require("./routes/users");
const fixtures = require("./routes/fixtures");
const applicationForGame = require("./routes/applicationForGame");
const approvalForGame = require("./routes/approvalForGame");
const fixtureAndApplicationChecker = require("./routes/fixtureAndApplicationChecker");

const app = express();

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

require("run-middleware")(app);
app.use(passport.initialize());
require("./passport")(passport);
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/fixtures", fixtures, fixtureAndApplicationChecker);
app.use("/api/applications", applicationForGame, approvalForGame);

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

// cron.schedule("*/5 * * * * *", () => {
//   console.log("cron running");
//   app.runMiddleware("/fixtureAndApplicationChecker", function(response) {
//     console.log("Cron Response:", response);
//   });
// });

module.exports = { app, runServer, closeServer };

// const PORT = process.env.PORT || 8000;
//
// app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}`);
// });
