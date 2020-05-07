export class Person {
    id: number;
    firstName: string;
    lastName: string;
    birthdate: Date;

    /**
     * Static function for creating a Person instance from the structure the
     * database gives us
     */
    static from(obj: PersonTable) {
        const person = new Person(
            obj.id, obj.first_name, obj.last_name, new Date(obj.birthdate)
        );
        return person;
    }

    constructor(id: number, firstName: string, lastName: string, birthdate: Date) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
    }

    /* Alternatively use this without property declaration */
    // constructor(private id: number, private firstName: string,
    //             private lastName: string, private birthdate: Date) {
    // }
}

interface PersonTable {
    id: number;
    first_name: string;
    last_name: string;
    birthdate: string;
}