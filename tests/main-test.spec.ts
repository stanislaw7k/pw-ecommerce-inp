import { test, expect } from '@playwright/test';
import HomePage from '../ui/home.page';
import NavbarSection from '../ui/navbar.section';

const product = {
  name: 'Hummingbird printed sweater',
  price: '€34.46',
};

const personalInfo = {
  firstName: 'Mike',
  lastName: 'Wazowsky',
  email: 'm.wazowsky@test.com',
  address1: 'Long Street 14',
  postalCode: '00000',
  city: 'New City',
  country: 'France',
  state: 'Alaska',
};

test('User can search for a product and purchase it', async ({ page }) => {
  const iFrame = page.frameLocator('#framelive');

  const homePage = new HomePage(page);
  const navbar = new NavbarSection(page);

  await test.step('Launch the preferred browser and Navigate to the specified website URL.', async () => {
    await homePage.goto();
    await homePage.assertIsVisible();
  });

  await test.step('Enter the product name into the search field and Execute the search operation.', async () => {
    await navbar.searchFor(product.name);
  });

  await test.step('Validate that the search results display the correct product.', async () => {
    await expect(iFrame.locator('#js-product-list-header')).toHaveText(
      'Search results'
    );
    await expect(iFrame.locator('#js-product-list h2')).toHaveText(
      product.name
    );
  });

  await test.step('Add the product to the shopping cart.', async () => {
    await iFrame.locator('#js-product-list h2').click();
    await iFrame.getByRole('button', { name: 'Add to cart' }).click();
    await expect(
      iFrame.locator('#myModalLabel', {
        hasText: 'Product successfully added to your shopping cart',
      })
    ).toBeVisible();
  });

  await test.step('Confirm that the cart correctly displays the added product.', async () => {
    await iFrame.getByRole('link', { name: 'Proceed to checkout' }).click();
    await expect(iFrame.locator('h1')).toHaveText('Shopping Cart');
    await expect(
      iFrame.locator('li.cart-item div.product-line-info a')
    ).toHaveText(product.name);
    await expect(iFrame.locator('span.product-price')).toHaveText(
      product.price
    );
  });

  await test.step('Proceed to the checkout page.', async () => {
    await iFrame.getByRole('link', { name: 'Proceed to checkout' }).click();
  });

  await test.step('Fill in all required information fields.', async () => {
    await iFrame.locator('#field-firstname').fill(personalInfo.firstName);
    await iFrame.locator('#field-lastname').fill(personalInfo.lastName);
    await iFrame
      .locator('#checkout-guest-form #field-email')
      .fill(personalInfo.email);
    await iFrame
      .getByLabel('I agree to the terms and conditions and the privacy policy')
      .check();
    await iFrame.getByLabel('Customer data privacy').check();
    await iFrame.getByRole('button', { name: 'Continue' }).click();

    await iFrame.locator('#field-address1').fill(personalInfo.address1);
    await iFrame.locator('#field-postcode').fill(personalInfo.postalCode);
    await iFrame.locator('#field-city').fill(personalInfo.city);
    await iFrame
      .locator('#field-id_country')
      .selectOption(personalInfo.country);
    await iFrame.locator('#field-id_state').selectOption(personalInfo.state);

    await iFrame.getByRole('button', { name: 'Continue' }).click();

    await expect(iFrame.locator('.delivery-options')).toBeVisible();
  });

  await test.step('Navigate to the payment options page.', async () => {
    await iFrame.getByRole('button', { name: 'Continue' }).click();
  });

  await test.step('Verify the availability of all listed payment methods.', async () => {
    const paymentOptions = [
      'Pay by bank wire',
      'Pay by Cash on Delivery',
      'Pay by Check',
    ];

    paymentOptions.forEach(async (option) => {
      await expect(iFrame.locator('div.payment-options')).toContainText(option);
    });
  });

  await test.step('Complete the purchase process.', async () => {
    await iFrame.getByLabel('Pay by Cash on Delivery').check();
    await iFrame.getByLabel('I agree to the terms of service').check();
    await iFrame.getByRole('button', { name: 'Place Order' }).click();
  });

  await test.step('Ensure the order confirmation page loads successfully and displays the correct order details', async () => {
    await expect(
      iFrame.locator('h3', { hasText: 'Your order is confirmed' })
    ).toBeVisible();

    await expect(
      iFrame.locator('#content-hook_order_confirmation')
    ).toContainText(personalInfo.email);

    await expect(iFrame.locator('#order-items')).toContainText(product.name);

    await expect(iFrame.locator('tr.total-value')).toContainText(product.price);

    await expect(iFrame.locator('#order-details')).toContainText(
      'Payment method: Cash on delivery (COD)'
    );

    await expect(iFrame.locator('#order-details')).toContainText(
      'Shipping method: Click and collect'
    );
  });
});
