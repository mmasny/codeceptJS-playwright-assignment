Feature: Shop

Scenario: Sort products by name
  Given I am logged in as a "standard_user"
  And the inventory page is open
  And I see products are sorted alphabetically by default
  When I sort products by "Name (Z to A)"
  Then I should see products are sorted in inverse alphabetical order
  
Scenario: Add product to cart
  Given I am logged in as a "problem_user"
  And the inventory page is open
  When I look for the product "Sauce Labs Bolt T-Shirt"
  And I add product "Sauce Labs Bolt T-Shirt" to the cart
  And I click on the cart icon
  Then I should see product "Sauce Labs Bolt T-Shirt" in the cart
  