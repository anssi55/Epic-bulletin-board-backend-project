import app from '../app/app';
import * as mocha from 'mocha';
let chai = require("chai");
import chaiHttp = require('chai-http');
import examples from './testJson/categoriesExamples.json';
const awilix = require('awilix')

chai.use(chaiHttp);
const expect = chai.expect;


//Testing /posts-route

describe('GET api/v1/categories', function()  {
  it('responds with JSON array', async function()  {
    return await chai.request().get('/categories')
      .then (res => {
        expect(res.status).to.eql(200)
        expect(res.body).to.be.an('array')
      });
  })

});

describe('POST api/v1/categories', function()  {
  
  it('responds with JSON array', async function()  {
    return await chai.request(app).post('/categories')
    .set('content-type', 'application/json')
    .send(examples.tests[0])
      .then(res => {
        expect(res.status).to.eql(200)
        expect(res.body).to.be.an('array')
      });
  });

  it('Bad request: It should return 400 error', function()  {
    return chai.request(app).post('/categories')
    .set('content-type', 'application/categories')
    .send(examples.tests[1])
      .then(res => {
        expect(res.status).to.eql(400)
        expect(res.body).to.be.an('array')
      });
  });

  describe('PUT api/v1/posts', function() {
  
    it('responds with JSON array', async function()  {
      return await chai.request(app).put('/categories/1')
      .set('content-type', 'application/json')
      .send(examples.tests[0])
        .then(res => {
          expect(res.status).to.eql(200)
          expect(res.body).to.be.an('array')
        });
    });
  });

  describe('DELETE api/v1/posts', function() {
  
    it('responds with JSON array', async function()  {
      return await chai.request(app).delete('/categories/1')
      .set('content-type', 'application/json')
      .send(examples.tests[0])
        .then(res => {
          expect(res.status).to.eql(200)
          expect(res.body).to.be.an('array')
        });
    });
  });
});