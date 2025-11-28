# CodeceptJS Playwright Homework

## :pushpin: Overview

This project is an **E2E + API test suite** built using:

- **CodeceptJS**  
- **Playwright** (UI automation)  
- **REST + JSONResponse helpers** (API testing)  
- **TypeScript**  
- **Gherkin (Cucumber‐style BDD)**  
- **Allure** as the reporting engine  

It is structured as a hybrid UI/API framework designed for demonstration and assignment purposes.

---

## :wrench: Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd codeceptjs-playwright-homework
```
### 2. Install dependencies
```bash
yarn install
```
or

```bash
npm install
```
### 3. (Optional) Install Allure command-line
```bash
npm install -g allure-commandline --save-dev
```

---

## :closed_lock_with_key: Environment Variables

A `.env` file is already included in the repository with the required variable names:

```env
USER_PASSWORD=
API_KEY=
```
You only need to fill in the values.

USER_PASSWORD
Used for UI login tests against https://www.saucedemo.com/.
The public demo password can be obtained directly from the site's login page:

:point_right: https://www.saucedemo.com/

API_KEY
Used for authenticating API tests against https://reqres.in/.
A public demo API key can be generated or retrieved here:

:point_right: https://reqres.in/

Even though both values are publicly available test credentials, they are stored in .env to follow good practices and keep secrets out of source control.

After updating .env, restart your terminal or IDE to ensure the variables are loaded.

---

## :arrow_forward: Running Tests

Run API tests only
```bash
yarn test:api
```
Equivalent:
```bash
npx codeceptjs run --tests
```
Run E2E/UI tests (Gherkin)
```bash
yarn test:e2e
```
Equivalent:
```bash
npx codeceptjs run --features
```
Run ALL tests 
```bash
yarn test:all
```
Generate Allure results and report automatically
```bash
yarn allure:results
```
This executes:

1. All CodeceptJS tests

2. Creates allure-results/

3. Generates allure-report/

4. Opens the report in your browser

---

## :bar_chart: Allure Report Usage

Generate a new Allure report
```bash
yarn allure:generate
```

or

```bash
npx allure generate ./allure-results --clean
```
Open the Allure report
```bash
yarn allure:open
```

Equivalent:
```bash
npx allure open ./allure-report
```

This launches an interactive test dashboard.