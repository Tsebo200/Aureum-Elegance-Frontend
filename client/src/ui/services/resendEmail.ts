const resendApiKey = 're_BErZghQ2_Nc43badNbdXrzzT4qyEbCULZ';

export async function sendOtpEmail(email: string, otp: string) {
  const payload = {
from: 'Mystefy <tseboramzy.co.za>',
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
  };

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const resendUrl = 'https://api.resend.com/emails';

  try {
    const response = await fetch(proxyUrl + resendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error sending email: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to send email:', error);
    console.log(payload)
    throw error;
  }
}
