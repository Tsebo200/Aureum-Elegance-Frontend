// twilioService.ts
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000';

export async function sendOtp(phone: string) {
  // Call your backend's send-otp endpoint
  return axios.post(`${BACKEND_URL}/send-otp`, { phone });
}

export async function verifyOtp(phone: string, code: string) {
  // Call your backend's verify-otp endpoint
  return axios.post(`${BACKEND_URL}/verify-otp`, { phone, code });
}
