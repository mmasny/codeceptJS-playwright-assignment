import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import assert from 'assert';

const I = actor()

let removedProductName: string;

Given('the inventory page is open', async () => {
    I.seeInCurrentUrl('/inventory');
    await I.seeElement(InventoryPage.locators.inventoryItem);
    }
)

Given('I see products are sorted alphabetically by default', async () => {
    const productNames = await I.getProductsNames();
    I.checkAlphabeticalOrder(productNames);
    }
)

When('I sort products by {string}', async (sortOption) => {
    await I.selectOption('select[data-test="product-sort-container"]', sortOption);
    }
)

When('I look for the product {string}', async (productName) => {
    await I.see(productName, InventoryPage.locators.inventoryItem);
    }
)

When('I add product {string} to the cart', async (productName) => {
    await I.clickButtonForProduct(productName);
    }
)

When('I click on the cart icon', async () => {
    await I.click(InventoryPage.buttons.cartButton)
    I.seeInCurrentUrl('/cart');
})

When('I add all products to cart', async () => {
    const products = await I.getProducts();
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const productCard = products.nth(i);
        await productCard.locator(InventoryPage.buttons.button).click();
        }
    }
)

When('I remove 3rd product from the cart', async () => {
    const products = await I.getProducts();
    const thirdProduct = products.nth(2);
    removedProductName = await thirdProduct.locator(InventoryPage.locators.productName).innerText();
    await thirdProduct.locator(InventoryPage.buttons.removefromCart).click();
    }
)

When('I proceed to checkout', async () => {
    await I.click(CartPage.buttons.checkout);
    I.seeInCurrentUrl('/checkout-step-one');
    }
)

When('I fill in checkout information with {string}, {string}, {string}', async (firstName, lastName, postalCode) => {
    I.fillField(CheckoutPage.inputs.firstName, firstName);
    I.fillField(CheckoutPage.inputs.lastName, lastName);
    I.fillField(CheckoutPage.inputs.postalCode, postalCode);
    }
)

When('I proceed to checkout overview', async () => {
    I.click(CheckoutPage.buttons.continue);
    I.seeInCurrentUrl('/checkout-step-two');}
)

When('I finish the purchase', async () => {
    await I.click(CheckoutPage.buttons.finish);
    I.seeInCurrentUrl('/checkout-complete');
    I.seeElement(CheckoutPage.elements.thankYouMessage);
    I.seeElement(CheckoutPage.elements.completeOrder);
    }
)

Then('I should not see removed product', async () => {
    await I.dontSee(removedProductName, InventoryPage.locators.inventoryItem);
    }
)

Then('I should see total quantity of products is {int}', async (expectedQuantity) => {
    const products = await I.getProducts();
    let quantities: string[] = [];
    const count = await products.count();
    
    for (let i = 0; i < count; i++) {
    const card = products.nth(i);
    const qtyText = await card.locator(CheckoutPage.elements.itemQuantity).innerText();
    quantities.push(qtyText.trim());
    }

    const totalQuantity = quantities.reduce((sum, qty) => sum + parseInt(qty), 0);
    assert.strictEqual(totalQuantity, expectedQuantity);
    }
)

Then('I should see products are sorted in inverse alphabetical order', async () => {
    const productNames = await I.getProductsNames();
    I.checkAlphabeticalOrder(productNames.reverse());
    }
)

Then('I should see product {string} in the cart', async (productName) => {
    await I.see(productName, InventoryPage.locators.inventoryItem);
    }
)

Then('I should see the order confirmation message', async () => {
    await I.seeElement(CheckoutPage.elements.thankYouMessage);
    await I.seeElement(CheckoutPage.elements.completeOrder);
    }
)