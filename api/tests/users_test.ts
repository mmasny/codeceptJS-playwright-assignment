import { faker } from '@faker-js/faker';
const { isSameDay } = require("date-fns");
import assert from 'assert';


Feature('Users endpoint')

Scenario('Get users and print those with odd ID number', async ({ I }) => {
  const query = new URLSearchParams({
  per_page: '10',
}).toString();

  const res = await I.sendGetRequest(`/users?${query}`);
  I.seeResponseCodeIsSuccessful();
  console.log(res.data.data.filter((user: { id: number }) => user.id % 2 !== 0));
})

Scenario('Register a user', async ({ I }) => {
  // based on swagger API docs it should fail
  // based on fragmentary postman collection it should succeed
  const username = faker.person.firstName();
  const password = faker.person.lastName();
  const email = faker.internet.email(
      {
        firstName: username,
        lastName: password,
      }
    );
  const res = await I.sendPostRequest('/register', {
    email: 'eve.holt@reqres.in',
    password: 'pistol'
    }
    )

  I.seeResponseCodeIsSuccessful();
  const date = new Date(res.headers.date);
  const today = new Date()
  const result = isSameDay(date, today);
  assert.strictEqual(result, true);
})

Scenario('Update a user', async ({ I }) => {
  const newName = faker.person.firstName();
  const hobby = 'testing';

  const res = await I.sendPutRequest('/users/2', {
    firstname: newName,
    hobby: hobby
    }
    )
  I.seeResponseCodeIsSuccessful();
  console.log(res.data);
  assert.strictEqual(res.data.firstname, newName);
})
