const { isSameDay } = require("date-fns");
import assert from 'assert';

Feature('/register endpoint')

Scenario('Register a user', async ({ I }) => {
  // based on swagger API docs (https://reqres.in/api-docs/) it should fail
  // based on fragmentary postman collection it should succeed

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
