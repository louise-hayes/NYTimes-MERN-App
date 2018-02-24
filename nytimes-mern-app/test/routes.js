const path = require('path');
// load default variables for testing
require('dotenv').config({ path: path.join(__dirname, '../../.env.example') });
var assert = require('assert');
var proxyquire = require('proxyquire');

const app = require('../src/routes.js');
const request = require('supertest');

describe('express', () => {
  it('load home page when GET /', () => {
    request(app).get('/').expect(200);
  });

  it('404 when page not found', () => {
    request(app).get('/foo/bar').expect(404);
  });

  it('Should POST /articles : should assert a value of article ID 3', function (finish) {
    //define sequelize db object format(db.Events.create)
    var db = {
        Article: {
            create: function (article) { //checking that db.Events.create(req.body) in api.js is being called

                return new Promise(function (resolve, reject) { //boilerplate javascrupt for returning a promise which the db.Events/create expects
                    assert.equal(article.header, "test");
                    // article.createdAt = "2018-01-03T14:51:24.681Z";
                    resolve(article); //when using return new Promise you have to resolve the promise in order to return the event   
                });
                //console.log(article);
            }
        }
    };

    //define the express route function which will substitute the event moster db with our lcoal db object
    //using proxyrequire module
    var route = proxyquire('../src/api.js', {
        '../models/': db
    });

    //we only want to test the POST to '/api/events', we do not want to update the DB,
    // therefore any calls from api/events to the db as specified in ../models/ is replaced via proxyquire with
    // mock up db object 
    //i.e. using proxyquire we substitute ../models/ with the local db object here 


    // var route = require ('../routes/api.js');

    var req = {
        body: {
            "articleheader": "test",
            "summary": "Article Summary",
            "pubdate": "01/01/2018"
        },
        method: 'POST',
        url: '/articles',
        headers: [],
        // pause: function () {},
        // resume: function () {},
    };

    // mock response

    var res = {
        json: function (data) {
            //assert.equal checks what is returned and if the event-name is "test event 2" the test will pass
            assert.equal(data.articleheader, 'test');
            finish();
        },
        status: function (status) {},
        setHeader: function () {}
    };
    // console.log("testing POST to api/events");
    //call the express route function
    route(req, res);
    //can use assert.equal here but in this case not necessary as we have it in the response above
    // assert.equal(var1, '2');
});



});
