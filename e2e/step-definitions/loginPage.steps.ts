import { error } from 'console';
import LoginPage from '../pages/LoginPage';

const I = actor()

Given('the main page is open', () => {
  I.amOnPage('/')
})

When('I type {string} into the {string} field', (text, locator) => {
  I.fillField(LoginPage.fields[locator], text === "password" ? secret(process.env.USER_PASSWORD) : text);
})

When('I click the {string} button', (locator) => {
  I.click(LoginPage.buttons[locator]);
})

Then('I should see the error message', () => {
  I.see(LoginPage.errorMsg, LoginPage.errorLocked);
})
