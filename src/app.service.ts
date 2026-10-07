import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getAppInfo() {
    return {
      appName: this.configService.get<string>('appName'),
      version: '1.0.0',
      status: 'online',
      timestamp: new Date().toISOString(),
      docs: '/docs',
      dashboard: '/',
      endpoints: {
        auth: '/api/v1/auth',
        users: '/api/v1/users',
        upload: '/api/v1/upload',
        payment: '/api/v1/payment',
      },
    };
  }
}
