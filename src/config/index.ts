import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_secret: process.env.RESET_PASS_TOKEN,
    reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  },

  sslcz: {
    sslcz_store_id: process.env.SSLCZ_STORE_ID,
    sslcz_store_passwd: process.env.SSLCZ_STORE_PASSWD,
    sslcz_success_url: process.env.SSLCZ_SUCCESS_URL,
    sslcz_cancel_url: process.env.SSLCZ_CANCEL_URL,
    sslcz_fail_url: process.env.SSLCZ_FAIL_URL,
    sslcz_payment_api: process.env.SSLCZ_PAYMENT_API,
    sslcz_validation_api: process.env.SSLCZ_VALIDATION_API,
  },
};
