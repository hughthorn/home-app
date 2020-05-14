import express from 'express';
import bodyParser from 'body-parser';
import { peopleRouter } from '../../src/routers/people-router';
import * as peopleService from '../../src/services/people-service';
import request from 'supertest';

// Setup mock for peopleService dependency
jest.mock('../../src/services/people-service');
const mockPeopleService = peopleService as any;

// Setup Express server and middleware
const app = express();
app.use(bodyParser.json())
app.use('/people', peopleRouter);

describe('GET /people', () => {
    test('Returns normally under normal circumstances', async () => {
        mockPeopleService.getAllPeople.mockImplementation(async () => []);
        await request(app)
            // if we send a request to GET "/"
            .get('/people')
            // We expect a response with status of 200
            .expect(200)
            // and of content-type JSON
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test('Returns normally under normal circumstances', async () => {
        mockPeopleService.getAllPeople.mockImplementation(async () => {throw new Error()});
        await request(app)
            .get('/people')
            .expect(500);
    });
});

describe('POST /people', () => {
    test('Successful creation should return 201 status', async () => {
        mockPeopleService.savePerson.mockImplementation(async () => ({}));
        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .post('/people')
            .send(payload)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('Should return 500 when encountering an error', async () => {
        mockPeopleService.savePerson.mockImplementation(async () => {throw new Error()});

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2020-01-01'
        };

        await request(app)
            .post('/people')
            .send(payload)
            .expect(500);
    });
});


// test GET /people/:id
// 1. Write test that asserts that normal behavior should return a JSON payload with status 200
// 2. Write test that asserts if no object is returned (service returns falsy) status 404
// 3. Write test that asserts if service throws error, status 500

describe('GET /people/:id', () => {
    test('Normal behavior Json with status 200', async () => {
        mockPeopleService.getPersonById
            .mockImplementation(async () => ({}));

        await request(app)
            .get('/people/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8')
    });

    test('No object found (404)', async() => {
        mockPeopleService.getPersonById
            .mockImplementation(async () => (0));

        await request(app)
            .get('/people/blahblahblah')
            .expect(404);
    });

    test('500 internal server error', async() => {
        mockPeopleService.getPersonById
            .mockImplementation(async () => {throw new Error()});

        await request(app)
            .get('/people/99')
            .expect(500)
    })
})