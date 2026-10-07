import { Controller, Post, Body, UseGuards, Headers, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

class CreatePaymentDto {
  @ApiProperty({ example: 49.99, description: 'Amount in USD' })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ example: 'usd', default: 'usd' })
  @IsOptional()
  @IsString()
  currency?: string;
}

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create Stripe Payment Intent' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create-intent')
  createPaymentIntent(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.createPaymentIntent(
      createPaymentDto.amount,
      createPaymentDto.currency,
    );
  }

  @ApiOperation({ summary: 'Stripe Webhook Listener' })
  @Post('webhook')
  handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: any,
  ) {
    return this.paymentService.handleWebhook(signature, req.body);
  }
}
