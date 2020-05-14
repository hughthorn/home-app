import { Person } from '../models/Person';
import * as peopleDao from '../daos/people-dao';
import { Pet } from '../models/Pet';

export function getAllPeople(): Promise<Person[]> {
    // Apply internal business logic
    return peopleDao.getAllPeople();
}

export function getPersonById(id: number): Promise<Person> {
    // Apply internal business logic
    return peopleDao.getPersonById(id);
}

export function getPetsByPersonId(id: number): Promise<Pet[]> {
    return peopleDao.getPetsByPersonId(id);
}

export function savePerson(person: any): Promise<Person> {

    console.log(person);
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
        console.warn('Person invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}


export function patchPerson(input: any): Promise<Person> {

    // We don't want to create Date(undefined) so check if input.birthdate
    // is defined, otherwise just pass undefined along
    const birthdate = input.birthdate && new Date(input.birthdate);

    const person = new Person(
        input.id, input.firstName,
        input.lastName, birthdate
    );

    if (!person.id) {
        throw new Error('400');
    }

    return peopleDao.patchPerson(person);
}