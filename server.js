import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import herokuSSLRedirect from 'heroku-ssl-redirect';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const sslRedirect = herokuSSLRedirect.default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const PORT = process.env.PORT || 5173;
const REQUEST_TIMEOUT = 25000; // heroku times out after 30 seconds

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        connectSrc: [
          "'self'",
          'https://tengo-magellan-prod-app.s3.eu-west-3.amazonaws.com', // Add this line to allow connections to S3
          'https://tengo-magellan-prod-companies.s3.eu-west-3.amazonaws.com', // Add this line to allow connections to S3
          'https://*.officeapps.live.com',
        ],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: [
          "'self'",
          'data:', // Allow images from 'self' and inline data URIs
          'https://logo.clearbit.com', // Allow images from clearbit.com
          'https://tengo-magellan-prod-app.s3.eu-west-3.amazonaws.com', // Add this line to allow connections to S3
          'https://tengo-magellan-prod-companies.s3.eu-west-3.amazonaws.com', // Add this line to allow connections to S3
        ],
        workerSrc: [
          "'self'",
          'blob:', // Allow blob URLs for web workers, posthog for example use it to capture analytics
        ],
        frameSrc: ["'self'", 'https://view.officeapps.live.com'],
        childSrc: ["'self'", 'https://view.officeapps.live.com'],
      },
    },
  }),
);
app.use(sslRedirect());
app.use((req, res, next) => {
  res.setTimeout(REQUEST_TIMEOUT, () => {
    console.error('Request timed out');
    res.status(408).send('Request timed out');
  });
  next();
});

app.use(express.static(join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
