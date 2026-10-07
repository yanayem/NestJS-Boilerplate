import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentService.name);

  constructor(private configService: ConfigService) {
    const secretKey = this.configService.get<string>('stripe.secretKey');
    if (secretKey) {
      this.stripe = new Stripe(secretKey, {
        apiVersion: '2022-11-15' as any,
      });
    }
  }

  async createPaymentIntent(amount: number, currency = 'usd'): Promise<{ clientSecret: string }> {
    if (!this.stripe) {
      this.logger.warn('Stripe secret key not configured. Returning simulated PaymentIntent response.');
      return { clientSecret: 'pi_simulated_secret_key_123456789' };
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert to cents
        currency,
        automatic_payment_methods: { enabled: true },
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      this.logger.error(`Stripe payment intent creation failed: ${error.message}`);
      throw new BadRequestException(`Payment creation failed: ${error.message}`);
    }
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>('stripe.webhookSecret');

    if (!this.stripe || !webhookSecret) {
      this.logger.warn('Stripe webhook secret not configured. Skipping signature verification.');
      return { received: true, simulated: true };
    }

    try {
      const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          this.logger.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
          break;
        case 'payment_intent.payment_failed':
          this.logger.warn(`Payment failed for Intent`);
          break;
        default:
          this.logger.log(`Unhandled event type ${event.type}`);
      }

      return { received: true };
    } catch (err) {
      this.logger.error(`Webhook Signature Error: ${err.message}`);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
  }
}
