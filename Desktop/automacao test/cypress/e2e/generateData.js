// cypress/support/generateData.js
import { faker } from '@faker-js/faker';

export const generateUser = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    return {
        firstName,
        lastName,
        email,
        password,
        fullName: `${firstName} ${lastName}`
    };
};

// Você pode adicionar mais funções conforme a necessidade dos Test Cases