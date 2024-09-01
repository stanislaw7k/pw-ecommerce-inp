# Introduction

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

# Task description and comments

## Choose the stack

Choose the stack you are familiar with - preference would be JS/TS Playwright/WebdriverIO

## Choose a demo app

List of E-Commerce Demo Websites:

- https://www.saucedemo.com
- https://demo.prestashop.com
- https://www.demoblaze.com
- any other e-commerce website suitable for the task

## Primary task

Task list (primary):

- Launch the preferred browser and Navigate to the specified website URL
- Enter the product name into the search field and Execute the search operation. Validate that the search
  results display the correct product
- Add the product to the shopping cart. Confirm that the cart correctly displays the added product
- Proceed to the checkout page. Fill in all required information fields
- Navigate to the payment options page. Verify the availability of all listed payment methods
- Complete the purchase process. Ensure the order confirmation page loads successfully and displays the
  correct order details

## Additional tasks

Task list (choose how many you want - write in the README why you have chosen specific points):

- Framework and Configuration Setup: Implement the Page Object Model, and manage test settings via a
  configuration file for base URLs, wait timeouts, browser drivers, and instances.
- Custom Functionality and Browser Configuration: Develop custom functions for assertions and UI
  interactions and customize browser settings, including window size.
- Test Lifecycle Management: Utilize Before and After annotations/hooks for setup and cleanup. Enable
  screenshot capabilities.
- Negative and Field Validation Testing: Design negative test scenarios to check system responses to
  omitted inputs and validate correct data entry in specific fields.
- Cross-Browser Compatibility and Test Suites: Ensure tests are compatible with at least Chrome and
  Firefox browsers. Organize test suites for both positive and negative testing scenarios. Create test scripts
  that allow tests to be run on a different browser and test suite.

## Final tasks:

- Create a README file and write instructions for launching your tests
- Share the automation project link through source code repositories like GitHub (keep commit history)
