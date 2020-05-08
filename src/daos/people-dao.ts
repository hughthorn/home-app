import { db } from '../daos/db';
import { Person, PersonRow } from '../models/Person';

/**
 * If we are using a one-off query for, we can just use db.query - it will have a connection
 * issue the query without having to pull it from the pool.
 *
 * query(sql, [params, ...]);
 */

export function getAllPeople(): Promise<Person[]> {
    const sql = 'SELECT * FROM people';

    // 1. Query database using sql statement above
    // 2. Query will return a promise typed as QueryResult<PersonRow>
    // 3. We can react to the database response by chaining a .then onto the query
    return db.query<PersonRow>(sql, []).then(result => {
        // 4. Extract rows from the query response
        const rows: PersonRow[] = result.rows;

        console.log(rows);

        // 5. Convert row data format to Person objects
        const people: Person[] = rows.map(row => Person.from(row));
        return people;
    });
}

export function getPersonById(id: number): Promise<Person> {
    // DO NOT ACTUALLY DO THIS
    // const sql = 'SELECT * FROM people WHERE id = ' + id;

    // Use parameterized queries to avoid SQL Injection
    // $1 -> Parameter 1 placeholder
    const sql = 'SELECT * FROM people WHERE id = $1';

    return db.query<PersonRow>(sql, [id])
        .then(result => result.rows.map(row => Person.from(row))[0]);
}

export function savePerson(person: Person): Promise<Person> {
    const sql = `INSERT INTO people (first_name, last_name, birthdate) \
VALUES ($1, $2, $3) RETURNING *`;

    return db.query<PersonRow>(sql, [
        person.firstName,
        person.lastName,
        person.birthdate.toISOString()
    ]).then(result => result.rows.map(row => Person.from(row))[0]);
}

export function patchPerson(person: Person): Promise<Person> {
    // coalesce(null, 'hello') --> 'hello'
    // coalesce('hello', 'goodbye') --> 'hello'

    const sql = `UPDATE people SET first_name = COALESCE($1, first_name), \
last_name = COALESCE($2, last_name), birthdate = COALESCE($3, birthdate) \
WHERE id = $4 RETURNING *`;

    // if we call toISOString on undefined, we get a TypeError, since undefined
    // is valid for patch, we guard operator to defend against calling
    // .toISOString on undefined, allowing COALESCE to do its job
    const birthdate = person.birthdate && person.birthdate.toISOString();

    const params = [person.firstName, person.lastName,
                    birthdate, person.id];

    return db.query<PersonRow>(sql, params)
        .then(result => result.rows.map(row => Person.from(row))[0]);
}