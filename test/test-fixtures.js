const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Fixtures", function() {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });
  it("should add a fixture on POST", function() {
    const newFixture = {
      date: "17/11/2018",
      time: "20:00",
      playersReq: 2,
      cost: "5.00",
      venue: "Brislington Soccer Centre",
      pitchNo: 3,
      comments: "Turn up or you're dead!"
    };
    return chai
      .request(app)
      .post("/add-game")
      .send(newFixture)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body).to.include.keys(
          "date",
          "time",
          "playersReq",
          "cost",
          "venue",
          "pitchNo",
          "comments"
        );
        expect(res.body.playersReq).to.be.a("number");
        expect(res.body.pitchNo).to.be.a("number");
        expect(res.body.id).to.not.equal(null);
        expect(res.body).to.deep.equal(
          Object.assign(newFixture, { id: res.body.id })
        );
      });
  });
  it("should list fixtures on GET", function() {
    // for Mocha tests, when we're dealing with asynchronous operations,
    // we must either return a Promise object or else call a `done` callback
    // at the end of the test. The `chai.request(server).get...` call is asynchronous
    // and returns a Promise, so we just return it.
    return chai
      .request(app)
      .get("/display-games")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");

        // because we create three items on app load
        expect(res.body.length).to.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        const expectedKeys = [
          "user_id",
          "date",
          "time",
          "playersReq",
          "cost",
          "venue",
          "pitchNo"
        ];
        res.body.forEach(function(fixture) {
          expect(fixture).to.be.a("object");
          expect(fixture).to.include.keys(expectedKeys);
        });
      });
  });
  it("should update fixtures on PUT", function() {
    // we initialize our updateData here and then after the initial
    // request to the app, we update it with an `id` property so
    // we can make a second, PUT call to the app.
    const updateData = {
      date: "25/11/18",
      time: "20:00",
      playersReq: "2",
      cost: "4",
      venue: "Goals Filton",
      pitchNo: "7",
      comments: "Blah Blah"
    };

    return (
      chai
        .request(app)
        // first have to get so we have an idea of object to update
        .get("/display-games")
        .then(function(res) {
          //updateData.id = res.body[0]._id;
          // this will return a promise whose value will be the response
          // object, which we can inspect in the next `then` block. Note
          // that we could have used a nested callback here instead of
          // returning a promise and chaining with `then`, but we find
          // this approach cleaner and easier to read and reason about.
          return chai
            .request(app)
            .put(`/update-game/${updateData.id}`)
            .send(updateData);
        })
        // prove that the PUT request has right status code
        // and returns updated item
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a("object");
          expect(res.body).to.deep.equal(updateData);
        })
    );
  });
  it("should delete fixtures on DELETE", function() {
    return (
      chai
        .request(app)
        // first have to get so we have an `id` of item
        // to delete
        .get("/display-games")
        .then(function(res) {
          return chai.request(app).delete(`/remove-game/${res.body[0].id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
        })
    );
  });
});
