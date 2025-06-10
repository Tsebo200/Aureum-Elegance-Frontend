// twilio-proxy.js (ES module style)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors({
//   origin: 'http://localhost:5123',  // React dev server URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
}));
app.options('*', cors());
app.use(express.json());


const accountSid = process.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = process.env.VITE_TWILIO_AUTH_TOKEN;
const verifySid = process.env.VITE_TWILIO_VERIFY_SID;

const client = twilio(accountSid, authToken);

app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: phone, channel: 'sms' });

    res.send({ status: verification.status });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phone, code });

    res.send({ status: verificationCheck.status });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Twilio proxy server running at http://localhost:${port}`);
});
