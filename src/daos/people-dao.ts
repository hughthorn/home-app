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

        // 5. Convert row data format to Person objects
        const people: Person[] = rows.map(row => Person.from(row));
        return people;
    });
}

export function getPersonById(id: number): Person {
    return undefined;
}

export function savePerson(person: any): Person {
    return undefined;
}