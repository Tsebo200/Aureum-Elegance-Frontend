import React, { useState } from 'react';
import './login.scss';
import backgroundImage from '../../assets/Log In Background.jpg';
import logo from '../../assets/Wordmark Logo.png';
import { useNavigate } from 'react-router-dom';
import { addLoginUser } from '../../services/UserServiceRoute';
import { sendOtp, verifyOtp } from '../../services/TwilioService';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {

  const verifyRes = await verifyOtp(phone, otp);
  if (verifyRes.data.status !== 'approved') {
    setError('OTP verification failed');
    return;
  }

      // Expecting addLoginUser to return a User object with userId and role
      const loggedInUser = await addLoginUser({ email, password, name: '', role: 'Employee' });

      // Store userId and role in localStorage for role-based guarding
      localStorage.setItem('userId', loggedInUser.userId.toString());
      localStorage.setItem('role', loggedInUser.role);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <main className="page-container">
      <img
        src={backgroundImage}
        alt="Login page background"
        className="background-image"
      />
      <div className="content-wrapper">
        <form className="form-container-login" onSubmit={handleSubmit}>
          <div className="logo-text">
            <img src={logo} alt="Company logo" />
          </div>
          <h2 className="welcome-text">Welcome Back!</h2>
          <h3 className="login-text">Log In</h3>

          <div className="input-container">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="styled-input"
              required
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="styled-input"
              required
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-container">
          <label className="input-label">Phone Number</label>
          <input
            type="tel"
            className="styled-input"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {!otpSent ? (
            <button
              type="button"
              className="login-button"
              onClick={async () => {
                try {
                  await sendOtp(phone);
                  setOtpSent(true);
                } catch (err) {
                  setError('Failed to send OTP');
                }
              }}
            >
              Send OTP
            </button>
          ) : (
            <>
              <label className="input-label">Enter OTP</label>
              <input
                type="text"
                className="styled-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </>
          )}
        </div>


          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
