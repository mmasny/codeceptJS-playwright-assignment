Feature: Login functionality

Scenario: Log in as locked out user
  Given the main page is open
  When I type "locked_out_user" into the "username" field
  And I type "password" into the "password" field
  And I click the "login" button
  Then I should see the error message
  