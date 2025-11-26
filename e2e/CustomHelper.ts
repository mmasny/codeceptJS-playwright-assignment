const Helper = require('@codeceptjs/helper');
import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';

class CustomHelper extends Helper {

    constructor(config: any) {
      super(config)
      this.helpers
    }

  async login(userType: string) {
    const allowed = ['standard_user', 'locked_out_user', 'problem_user'];

    if (!allowed.includes(userType)) {
      throw new Error(`Invalid user type: ${userType}`);
    }

    const { Playwright } = this.helpers;
    await Playwright.fillField(LoginPage.fields.username, userType);
    await Playwright.fillField(LoginPage.fields.password, process.env.USER_PASSWORD);
    await Playwright.click(LoginPage.buttons.login);

    await Playwright.waitInUrl('/inventory', 5);
  }

  async getProductsNames(): Promise<string[]> {
    const { Playwright } = this.helpers;
    const page = Playwright.page;
    return await page.locator(InventoryPage.locators.productName).allInnerTexts();
  }

  checkAlphabeticalOrder(elements: string[]) {
    const sortedElements = [...elements].sort();
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] !== sortedElements[i]) {
        throw new Error('Elements are not in alphabetical order');
      }
    }
  }

  async clickButtonForProduct(productName: string) {
    const { Playwright } = this.helpers;
    const page = Playwright.page;

    const card = page.locator(InventoryPage.locators.products).filter({ hasText: productName });

    await card.locator('button').click();
  }
}

export = CustomHelper
