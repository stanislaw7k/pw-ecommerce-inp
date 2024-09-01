import { Page } from '@playwright/test';
import PersonalInfoStep from './checkout-steps/personal-info.step';
import AddressStep from './checkout-steps/addresses.step';
import ShippingStep from './checkout-steps/shipping.step';
import PaymentStep from './checkout-steps/payment.step';

export default class CheckoutPage {
  personalInfoStep: PersonalInfoStep;
  addressStep: AddressStep;
  shippingStep: ShippingStep;
  paymentStep: PaymentStep;

  constructor(page: Page) {
    this.personalInfoStep = new PersonalInfoStep(page);
    this.addressStep = new AddressStep(page);
    this.shippingStep = new ShippingStep(page);
    this.paymentStep = new PaymentStep(page);
  }
}
