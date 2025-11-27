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

Scenario: Purchase all but one product
  Given I am logged in as a "standard_user"
  And the inventory page is open
  When I add all products to cart
  And I click on the cart icon
  And I remove 3rd product from the cart
  And I proceed to checkout
  And I fill in checkout information with "Jan", "Kowalski", "12345"
  And I proceed to checkout overview
  Then I should not see removed product
  And I should see total quantity of products is 5
  When I finish the purchase
  Then I should see the order confirmation message