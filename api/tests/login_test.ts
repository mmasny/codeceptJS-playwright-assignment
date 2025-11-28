Feature('/login endpoint')

Scenario('Login user - no password', async ({I}) => {
    // based on swagger API docs (https://reqres.in/api-docs/) it should fail
    // based on stack overflow issue it should succeed

    const loginRes = await I.sendPostRequest('/login', {
        email: 'eve.holt@reqres.in',
        password: ''
        }
    )
  I.log(`Response: ${loginRes.data}`);

  I.seeResponseCodeIs(400);
})