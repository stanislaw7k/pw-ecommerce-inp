import { test } from '@playwright/test';
import HomePage from '../ui/home.page';
import NavbarSection from '../ui/navbar.section';
import SearchResultsPage from '../ui/search-results.page';
import ProductDetailsPage from '../ui/product-details.page';
import AddedToCartModal from '../ui/added-to-cart.modal';
import CartPage from '../ui/cart.page';
import CheckoutPage from '../ui/checkout.page';
import OrderConfirmationPage from '../ui/order-confirmation.page';

const testData = {
  product: {
    name: 'Hummingbird printed sweater',
    price: '€34.46',
  },
  personalInfo: {
    firstName: 'Mike',
    lastName: 'Wazowsky',
    email: 'm.wazowsky@test.com',
    address1: 'Long Street 14',
    postalCode: '00000',
    city: 'New City',
    country: 'France',
    state: 'Alaska',
  },
  shippingMethod: 'Click and collect',
  paymentMethods: [
    'Pay by bank wire',
    'Pay by Cash on Delivery',
    'Pay by Check',
  ],
};

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('Launch the preferred browser and Navigate to the specified website URL.', async () => {
    await homePage.goto();
    await homePage.assertIsVisible();
  });
});

test('User can search for a product and purchase it', async ({ page }) => {
  const navbar = new NavbarSection(page);
  const searchResultsPage = new SearchResultsPage(page);
  const productDetailsPage = new ProductDetailsPage(page);
  const addedToCartModal = new AddedToCartModal(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderConfirmationPage = new OrderConfirmationPage(page);

  await test.step('Enter the product name into the search field and Execute the search operation.', async () => {
    await navbar.searchFor(testData.product.name);
  });

  await test.step('Validate that the search results display the correct product.', async () => {
    await searchResultsPage.assertPageLoaded();
    await searchResultsPage.assertProductIsVisible(testData.product.name);
  });

  await test.step('Add the product to the shopping cart.', async () => {
    const responsePromise = page.waitForResponse(
      '**/module/productcomments/ListComments*'
    );

    await searchResultsPage.clickOnProduct(testData.product.name);

    const response = await responsePromise;

    await productDetailsPage.clickAddToCartButton();
  });

  await test.step('Confirm that the cart correctly displays the added product.', async () => {
    await addedToCartModal.assertIsVisible();
    await addedToCartModal.clickProceedButton();

    await cartPage.assertIsVisible();
    await cartPage.assertProductDetails(
      testData.product.name,
      testData.product.price
    );
  });

  await test.step('Proceed to the checkout page.', async () => {
    await cartPage.clickProceedButton();
  });

  await test.step('Fill in all required information fields.', async () => {
    await checkoutPage.personalInfoStep.fillFirstName(
      testData.personalInfo.firstName
    );
    await checkoutPage.personalInfoStep.fillLastName(
      testData.personalInfo.lastName
    );
    await checkoutPage.personalInfoStep.fillEmail(testData.personalInfo.email);
    await checkoutPage.personalInfoStep.checkRequiredConsent();
    await checkoutPage.personalInfoStep.clickContinue();

    await checkoutPage.addressStep.fillAddress1(testData.personalInfo.address1);
    await checkoutPage.addressStep.fillPostalCode(
      testData.personalInfo.postalCode
    );
    await checkoutPage.addressStep.fillCity(testData.personalInfo.city);
    await checkoutPage.addressStep.selectCountry(testData.personalInfo.country);
    await checkoutPage.addressStep.selectState(testData.personalInfo.state);
    await checkoutPage.addressStep.clickContinue();
  });

  await test.step('Navigate to the payment options page.', async () => {
    await checkoutPage.shippingStep.assertIsVisible();
    await checkoutPage.shippingStep.selectShippingMethod(
      testData.shippingMethod
    );
    await checkoutPage.shippingStep.clickContinue();
  });

  await test.step('Verify the availability of all listed payment methods.', async () => {
    await checkoutPage.paymentStep.assertIsVisible();

    await checkoutPage.paymentStep.assertPaymentMethods(
      testData.paymentMethods
    );
  });

  await test.step('Complete the purchase process.', async () => {
    await checkoutPage.paymentStep.selectPaymentOption(
      testData.paymentMethods[1]
    );
    await checkoutPage.paymentStep.checkTermsCheckbox();
    await checkoutPage.paymentStep.clickPlaceOrder();
  });

  await test.step('Ensure the order confirmation page loads successfully and displays the correct order details', async () => {
    await orderConfirmationPage.assertIsVisible();

    await orderConfirmationPage.assertEmailAddress(testData.personalInfo.email);
    await orderConfirmationPage.assertProductName(testData.product.name);
    await orderConfirmationPage.assertProductPrice(testData.product.price);
    await orderConfirmationPage.assertShippingMethod(testData.shippingMethod);
    await orderConfirmationPage.assertPaymentMethod('Cash on delivery (COD)');
  });
});
