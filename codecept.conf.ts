import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
import * as dotenv from 'dotenv';
dotenv.config();
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './e2e/tests/*.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.saucedemo.com',
      show: true
    }
  },
  include: {
    I: './steps_file',
    LoginPage: './e2e/pages/LoginPage.ts'
  },
  gherkin: {
    features: './e2e/features/login.feature',
    steps: [
      './e2e/step-definitions/loginPage.steps.ts',

    ]
  },
  plugins: {
    htmlReporter: {
      enabled: true
    }
  },
  name: 'codeceptJS-playwright-homework'
}