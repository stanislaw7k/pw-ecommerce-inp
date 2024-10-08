# Introduction

Hi! Here's my solution to the ecommerce task. Below you'll find info on:

- How to setup this repo.
- How to run tests.
- Task description with my comments.
- Additional comments.

# Setup

### Install Node.js

Go to the [Node.js website](https://nodejs.org/en/download/package-manager/current) if you haven't installed it yet.

### Clone this repository

```
git clone git@github.com:stanislaw7k/pw-ecommerce-inp.git
```

### Navigate to the project directory

```
cd pw-ecommerce-inp
```

### Install dependencies

```
npm install
```

### Install Playwright browsers

```
npx playwright install
```

# Run

You can use npm scripts to run tests.

### Run tests on Chromium browser

```
npm run on-chrome
```

### Run tests on Firefox browser

```
npm run on-firefox
```

### Run tests on all browsers

```
npm run on-all
```

# Task description and comments

## Choose the stack

Choose the stack you are familiar with - preference would be JS/TS Playwright/WebdriverIO

#### 📝 Comments

- I chose Playwright with TypeScript.

## Choose a demo app

List of E-Commerce Demo Websites:

- https://www.saucedemo.com
- https://demo.prestashop.com
- https://www.demoblaze.com
- any other e-commerce website suitable for the task

#### 📝 Comments

- Looks like _saucedemo.com_ and _demoblaze.com_ doesn't have search functionality so I chose **prestashop.com**

## Primary task

Task list (primary):

1. Launch the preferred browser and Navigate to the specified website URL
2. Enter the product name into the search field and Execute the search operation. Validate that the search
   results display the correct product
3. Add the product to the shopping cart. Confirm that the cart correctly displays the added product
4. Proceed to the checkout page. Fill in all required information fields
5. Navigate to the payment options page. Verify the availability of all listed payment methods
6. Complete the purchase process. Ensure the order confirmation page loads successfully and displays the
   correct order details

## Additional tasks

Task list (choose how many you want - write in the README why you have chosen specific points):

### ✅ Framework and Configuration Setup: Implement the Page Object Model, and manage test settings via a configuration file for base URLs, wait timeouts, browser drivers, and instances.

#### 📝 Comments

- Page Objects can be found in `/ui` directory.
- Configuration is in `playwright.config.ts`.

### ✅ Custom Functionality and Browser Configuration: Develop custom functions for assertions and UI interactions and customize browser settings, including window size.

#### 📝 Comments

- UI interactions are a part of Page Objects. You can find it in `/ui` directory.
- Browser settings can be checked and changed in `playwright.config.ts` file.

### ✅ Test Lifecycle Management: Utilize Before and After annotations/hooks for setup and cleanup. Enable screenshot capabilities.

#### 📝 Comments

- I used `beforeEach` hook to set test state.
- I didn't use `afterEach` hook as there was no need to clean any test data. Playwright Fixtures are responsible for stuff like closing a browser.

### - Negative and Field Validation Testing: Design negative test scenarios to check system responses to omitted inputs and validate correct data entry in specific fields.

#### 📝 Comments

- This task isn't done.
- I wanted to write a tests for checkout form validation, but I didn't have enough time to do it.

### ✅ Cross-Browser Compatibility and Test Suites: Ensure tests are compatible with at least Chrome and Firefox browsers. Organize test suites for both positive and negative testing scenarios. Create test scripts that allow tests to be run on a different browser and test suite.

#### 📝 Comments

- Check `Run` section of `README.md` to see how to use test scripts

## Final tasks:

- ✅ Create a README file and write instructions for launching your tests.
- ✅ Share the automation project link through source code repositories like GitHub (keep commit history).

# Additional comments

## Flakiness

- The main test was flaky one the _"Add the product to the shopping cart."_ step.
- I added waiting for API response which fixed the issue.
- You can run `npx playwright test main-test.spec.ts --repeat-each=50` to repeat the main test 50 times on each browser. It will pass everytime with this fix.

## iframe

- The Prestashop Demo App is run in an iframe.
- The source website is protected and can not be accessed without an iframe.
- I created `/ui/base.page.ts` to store iframe locator and use it in every other page class.
