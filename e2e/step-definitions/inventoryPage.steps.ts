import InventoryPage from '../pages/InventoryPage';

const I = actor()

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
})

Then('I should see products are sorted in inverse alphabetical order', async () => {
    const productNames = await I.getProductsNames();
    I.checkAlphabeticalOrder(productNames.reverse());
    }
)

Then('I should see product {string} in the cart', async (productName) => {
    await I.see(productName, InventoryPage.locators.inventoryItem);
})