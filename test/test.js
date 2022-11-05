const request = require('supertest')
const url = "http://localhost:8000"

describe('GET /planets', function() {
    it('Get all planets, responds with status code 200 and 8 planets', function(done) {
      request(url)
        .get('/planets')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          if (res.body.length !== 8) throw new Error("The number of planets is incorrect!")
          console.log(res.body)
          return done();
        });
    });
});
describe('GET /launches', function() {
    it('Get all launches, responds with status code 200 and 1 launches', function(done) {
      request(url)
        .get('/launches')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          if (res.body.length !== 1) throw new Error("The number of launches is incorrect")
          console.log(res.body)
          return done();
        });
    });
});

describe('Post /launches', function() {
    it('Add a launch, responds with status code 404 (Missing launch property rocket)', function(done) {
      request(url)
        .post('/launches')
        .send({
            mission: "Kepler Explore",
            launchDate: "July 27, 2030",
            target: "Kepler 1246",
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect({error: "Missing launch's property!"})
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});

describe('Post /launches', function() {
    it('Add a launch, responds with status code 404 (Missing launch property target)', function(done) {
      request(url)
        .post('/launches')
        .send({
            mission: "Kepler Explore",
            launchDate: "July 27, 2030",
            rocket: "ZTM 101"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect({error: "Missing launch's property!"})
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});

describe('Post /launches', function() {
    it('Add a launch, responds with status code 404 (Missing launch property launchDate)', function(done) {
      request(url)
        .post('/launches')
        .send({
            mission: "Kepler Explore",
            target: "Kepler 1246",
            rocket: "ZTM 101"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect({error: "Missing launch's property!"})
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});

describe('Post /launches', function() {
    it('Add a launch, responds with status code 404 (Missing launch property mission)', function(done) {
      request(url)
        .post('/launches')
        .send({
            launchDate: "July 27, 2030",
            target: "Kepler 1246",
            rocket: "ZTM 101"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect({error: "Missing launch's property!"})
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});

describe('Post /launches', function() {
    it('Add a launch, responds with status code 404 (Launch Date is invalid)', function(done) {
      request(url)
        .post('/launches')
        .send({
            mission: "Kepler Explore",
            launchDate: "Hello",
            target: "Kepler 1246",
            rocket: "ZTM 101"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect({error: "Launch Date is invalid!"})
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});

describe('Post /launches', function() {
    it('Add a launch, responds with status code 201 (success)', function(done) {
      request(url)
        .post('/launches')
        .send({
            mission: "Kepler Explore",
            launchDate: "July 27, 2031",
            target: "Kepler 1246",
            rocket: "ZTM 101"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect({
            mission: 'Kepler Explore',
            launchDate: 'July 27, 2031',
            target: 'Kepler 1246',
            rocket: 'ZTM 101',
            flightNumber: 11,
            customers: [ 'ZTM', 'Nasa' ],
            upcoming: true,
            success: true
          })
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});

describe('Delete /launches', function() {
    it('Delete a launch, responds with status code 404 (Launch is not exist!)', function(done) {
      request(url)
        .delete('/launches/100')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect({error: "Launch is not exist!"})
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});

describe('Delete /launches', function() {
    it('Delete a launch, responds with status code 200 (success)', function(done) {
      request(url)
        .delete('/launches/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({
            flightNumber: 10,
            mission: 'Mercury Exploration',
            launchDate: '2030-07-26T17:00:00.000Z',
            target: 'Mercury',
            rocket: 'API 4869',
            customers: [ 'ZTM', 'Nasa' ],
            upcoming: false,
            success: false
          })
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});



