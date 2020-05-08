import express from 'express';
import * as peopleService from '../services/people-service';

export const peopleRouter = express.Router();

/*
    http://localhost:3000/people
    Retrieves an array of people from database
*/
peopleRouter.get('', (request, response, next) => {
    peopleService.getAllPeople().then(people => {
        response.json(people);
        next();
    });
});

/*
    http://localhost:3000/people/1
    Retrieves a single person from the database by id
    If the person does not exist, sends 404
*/
peopleRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    const person = peopleService.getPersonById(id);
    if (!person) {
        response.sendStatus(404);
    } else {
        response.json(person);
    }
    next();
});

/*
    POST http://localhost:3000/people
    Creates a new person and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/
peopleRouter.post('', (request, response, next) => {
    const person = request.body;
    const createdPerson = peopleService.savePerson(person);
    response.status(201);
    response.json(createdPerson);
    next();
});