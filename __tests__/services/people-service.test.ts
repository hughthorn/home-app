import * as peopleService from '../../src/services/people-service';
import * as peopleDao from '../../src/daos/people-dao';
import { Person } from '../../src/models/Person';

/*
    Black-box testing vs White-box testing

    Black-box testing tests ONLY input-output of the function.
    White-box testing tests the known internal behavior of the function.
*/

/*
    Mocks the imported module
    The mocked module will allow us to
    stub methods - essentially replacing the
    original behavior with explicitly provided
    behavior such that our tests will not
    test the original behavior of this dependency
*/
jest.mock('../../src/daos/people-dao');

const mockPeopleDao = peopleDao as any;

describe('savePerson', () => {
    test('422 returned if no firstName provided', async () => {
        // peopleDao.savePerson will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockPeopleDao.savePerson.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            lastName: 'Smith',
            birthdate: '2020-01-01'
        }

        try {
            // This async function should reject due to missing firstName
            await peopleService.savePerson(payload);
            fail('peopleService.savePerson did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no birthdate is provided', async () => {
        // peopleDao.savePerson will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockPeopleDao.savePerson.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            lastName: 'Smith',
            firstName: 'John'
        }

        try {
            // This async function should reject due to missing firstName
            await peopleService.savePerson(payload);
            fail('peopleService.savePerson did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no lastName provided', async () => {
        // peopleDao.savePerson will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockPeopleDao.savePerson.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            firstName: 'John',
            birthdate: '2020-01-01'
        }

        try {
            // This async function should reject due to missing firstName
            await peopleService.savePerson(payload);
            fail('peopleService.savePerson did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('Input object transformed to Person object', async () => {
        mockPeopleDao.savePerson.mockImplementation(o => o);

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01'
        };

        const result = await peopleService.savePerson(payload);

        expect(payload).not.toBeInstanceOf(Person);
        expect(result).toBeInstanceOf(Person);
    });

    test('ID value of input is replaced in output', async () => {
        mockPeopleDao.savePerson.mockImplementation(o => o);

        const payload = {
            id: 15,
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01'
        };

        const result = await peopleService.savePerson(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockPeopleDao.savePerson.mockImplementation(o => o);

        const payload = {
            firstName: 'John',
            lastName: 'Smith',
            birthdate: '2000-01-01',
            likesSkateboards: true
        };

        const result = await peopleService.savePerson(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});

describe('patchPerson', () => {
    
});