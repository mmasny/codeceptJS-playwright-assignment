import { faker } from '@faker-js/faker';
import assert from 'assert';


Feature('/users endpoint')

Scenario('Get users and print those with odd ID number', async ({ I }) => {
  const query = new URLSearchParams({
  per_page: '10',
}).toString();

  const res = await I.sendGetRequest(`/users?${query}`);
  I.seeResponseCodeIsSuccessful();
  console.log(res.data.data.filter((user: { id: number }) => user.id % 2 !== 0));
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
  assert.strictEqual(res.data.firstname, newName);
})

const delays = [0, 3];

delays.forEach((delay) => {
  Scenario(`Get users with ${delay}s delay, validate response time <= 1s`, async ({ I }) => {

    const start = Date.now();
    const res = await I.sendGetRequest(`/users?delay=${delay}`);
    const elapsedTime = Date.now() - start;

    const reqInfo = `delay=${delay} → status=${res.status}, time=${elapsedTime}ms`
    console.log(reqInfo);
    I.say(reqInfo);

    I.seeResponseCodeIsSuccessful();

    if (elapsedTime > 1000) {
      throw new Error(
        `Response for ${delay}s delay: ${elapsedTime}ms (expected <= 1000ms)`
      );
    }
  });
});
