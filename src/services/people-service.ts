import { Person } from '../models/Person';
import * as peopleDao from '../daos/people-dao';

export function getAllPeople(): Promise<Person[]> {
    // Apply internal business logic
    return peopleDao.getAllPeople();
}

export function getPersonById(id: number): Person {
    // Apply internal business logic
    return peopleDao.getPersonById(id);
}

export function savePerson(person: any): Person {

    // Data from the user cannot be trusted
    const newPerson = new Person(
        undefined, person.firstName,
        person.lastName, new Date(person.birthdate)
    );

    // IF we're going validate it here, we probably want
    // constraints on the db too

    if(person.firstName && person.lastName && person.birthdate) {
        // Data is valid - Continue submitting to DAO
        return peopleDao.savePerson(newPerson);
    } else {
        // TODO: We should fail here, probably issue some kind of 400
    }
}
