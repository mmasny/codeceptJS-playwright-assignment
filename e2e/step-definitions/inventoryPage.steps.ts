import InventoryPage from '../pages/InventoryPage';

const I = actor()

Given('the inventory page is open', async () => {
    I.seeInCurrentUrl('/inventory');
    await I.seeElement(InventoryPage.locators.inventoryItem);
    }
),

Given('I see products are sorted alphabetically by default', async () => {
    const productNames = await I.getProductsNames();
    console.log('Product Names:', productNames);
    I.checkAlphabeticalOrder(productNames);
    }
)

When('I sort products by {string}', async (sortOption) => {
    await I.selectOption('select[data-test="product-sort-container"]', sortOption);
    }
)

Then('I should see products are sorted in inverse alphabetical order', async () => {
    const productNames = await I.getProductsNames();
    console.log('Reversed Product Names:', productNames);
    I.checkAlphabeticalOrder(productNames.reverse());
    }
);