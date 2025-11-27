const Helper = require('@codeceptjs/helper');
import LoginPage from './pages/LoginPage';
import InventoryPage from './pages/InventoryPage';
import type { Page, Locator } from 'playwright';

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

    getProducts(): Promise<Locator> {
    const { Playwright } = this.helpers;
    const page = Playwright.page;
    return page.locator(InventoryPage.locators.products);
  }

  async getProductsNames(): Promise<string[]> {
    const products = await this.getProducts()
    return await products.locator(InventoryPage.locators.productName).allInnerTexts();
  }

  async clickButtonForProduct(productName: string) {
    const products = await this.getProducts()
    const productCard = products.filter({ hasText: productName });
    await productCard.locator(InventoryPage.buttons.cartButton).click();
  }

  async getAddToCartButtons (): Promise<Locator> {
    const products = await this.getProducts()
    return products.locator(InventoryPage.buttons.button);
  }

  checkAlphabeticalOrder(elements: string[]) {
    const sortedElements = [...elements].sort();
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] !== sortedElements[i]) {
        throw new Error('Elements are not in alphabetical order');
      }
    }
  }
}

export = CustomHelper
