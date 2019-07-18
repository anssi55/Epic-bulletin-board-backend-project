import App from '../app/Apps';
let chai = require('chai');
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

//Testing /posts-route

describe('GET api/v1/categories', function() {
  it('responds with JSON array', async function() {
    return await chai
      .request()
      .get('/categories')
      .then((res: Response) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.an('array');
      });
  });
});

describe('POST api/v1/categories', function() {
  it('responds with JSON array', async function() {
    return await chai
      .request(App)
      .post('/categories')
      .set('content-type', 'application/json')
      .then((res: Response) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.an('array');
      });
  });

  it('Bad request: It should return 400 error', function() {
    return chai
      .request(App)
      .post('/categories')
      .set('content-type', 'application/categories')
      .then((res: Response) => {
        expect(res.status).to.eql(400);
        expect(res.body).to.be.an('array');
      });
  });

  describe('PUT api/v1/posts', function() {
    it('responds with JSON array', async function() {
      return await chai
        .request(App)
        .put('/categories/1')
        .set('content-type', 'application/json')
        .then((res: Response) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an('array');
        });
    });
  });

  describe('DELETE api/v1/posts', function() {
    it('responds with JSON array', async function() {
      return await chai
        .request(App)
        .delete('/categories/1')
        .set('content-type', 'application/json')
        .then((res: Response) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.an('array');
        });
    });
  });
});
