import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('mail.host'),
      port: this.configService.get<number>('mail.port'),
      auth: {
        user: this.configService.get<string>('mail.user'),
        pass: this.configService.get<string>('mail.pass'),
      },
    });
  }

  async sendWelcomeMail(to: string, name: string): Promise<boolean> {
    const from = this.configService.get<string>('mail.from');
    const appName = this.configService.get<string>('appName');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Welcome to ${appName}, ${name}! 🎉</h2>
        <p>Thank you for registering on our platform. We are excited to have you on board.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>${appName} Team</strong></p>
      </div>
    `;

    try {
      if (!this.configService.get<string>('mail.user')) {
        this.logger.warn(`SMTP credentials not set. Simulated sending welcome email to ${to}`);
        return true;
      }

      await this.transporter.sendMail({
        from,
        to,
        subject: `Welcome to ${appName}`,
        html: htmlContent,
      });

      this.logger.log(`Welcome email successfully sent to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error.message}`);
      return false;
    }
  }

  async sendPasswordResetMail(to: string, resetToken: string): Promise<boolean> {
    const from = this.configService.get<string>('mail.from');
    const appName = this.configService.get<string>('appName');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Use the token below or click the link to reset your password:</p>
        <p style="font-size: 18px; font-weight: bold; background: #f4f4f4; padding: 10px; display: inline-block;">
          ${resetToken}
        </p>
        <p>This token expires in 15 minutes.</p>
      </div>
    `;

    try {
      if (!this.configService.get<string>('mail.user')) {
        this.logger.warn(`SMTP credentials not set. Simulated password reset email to ${to}`);
        return true;
      }

      await this.transporter.sendMail({
        from,
        to,
        subject: `Password Reset - ${appName}`,
        html: htmlContent,
      });

      this.logger.log(`Password reset email successfully sent to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send reset email to ${to}: ${error.message}`);
      return false;
    }
  }
}
