import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";
import { join } from "path";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // Serve static files from 'public' directory
  app.useStaticAssets(join(__dirname, "..", "public"));

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Allowed for inline scripts in Swagger / Dashboard
    }),
  );

  // CORS
  app.enableCors({
    origin: configService.get<string>("clientUrl") || true,
    credentials: true,
  });

  // Global Prefix
  const apiPrefix = configService.get<string>("apiPrefix") || "api/v1";
  app.setGlobalPrefix(apiPrefix);

  // Global Pipes, Interceptors & Filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger OpenAPI Interactive UI Dashboard
  const { DocumentBuilder, SwaggerModule } = await import("@nestjs/swagger");
  const swaggerConfig = new DocumentBuilder()
    .setTitle("NestJS SaaS Boilerplate API")
    .setDescription("Interactive Web UI Dashboard for Auth, Users, AWS S3 Uploads, Email, and Stripe Payments")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, swaggerDocument);

  // Start Server
  const port = configService.get<number>("port") || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}/${apiPrefix}`);
  console.log(`Frontend UI Dashboard available at: ${await app.getUrl()}`);
  console.log(`Swagger OpenAPI available at: ${await app.getUrl()}/docs`);
}
bootstrap();
