const app = require('../src/app.js');
const utils = require('../src/utils.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);


describe('POST / ', () => {
    describe('Valid Params provided', () => {
        it('should return an object with the correct state (Colorado)', (done) => {
            chai.request(app).post('/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({'longitude': '-104.991531', 'latitude': '39.742043'})
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.state).to.equal('Colorado');
                done();
            });
        });
    });

    describe('Invalid Params provided', () => {
        it('should return an object that states the state was not found', (done) => {
            chai.request(app).post('/')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({'longitude': '86.922623', 'latitude': '27.986065'})
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.state).to.equal('Not Found');
                done();
            });
        });
    });

    describe('No Params', () => {
        it('should respond with 400', (done) => {
            chai.request(app).post('/')
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(err).to.exist;
                done();
            });
        });
    });

    describe('No longitude provided', () => {
        it('should respond with 400', (done) => {
            chai.request(app).post('/').send({'latitude': '40'})
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(err).to.exist;
                done();
            });
        });
    });

    describe('No latitude provided', () => {
        it('should respond with 400', (done) => {
            chai.request(app).post('/').send({'longitude': '70'})
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(err).to.exist;
                done();
            });
        });
    });
});