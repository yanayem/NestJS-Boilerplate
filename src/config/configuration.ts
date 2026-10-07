export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || "/api/v1",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  database: {
    uri:
      process.env.MONGODB_URI ||
      "mongodb://localhost:27017/nestjs_saas_boilerplate",
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "access_secret",
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || "15m",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh_secret",
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || "7d",
  },
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Bucket: process.env.AWS_S3_BUCKET,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10) || 2525,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM || "noreply@saasboilerplate.com",
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
});
