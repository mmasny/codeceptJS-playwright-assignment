Feature: Shop

Background: Inventory page is open
  Given I am logged in as a "standard_user"
  And the inventory page is open

Scenario: Sort products by name
  Given I see products are sorted alphabetically by default
  When I sort products by "Name (Z to A)"
  Then I should see products are sorted in inverse alphabetical order
  