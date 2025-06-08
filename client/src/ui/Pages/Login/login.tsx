import React, { useState } from 'react';
import './login.scss';
import backgroundImage from '../../assets/Log In Background.jpg';
import logo from '../../assets/Wordmark Logo.png';
import { useNavigate } from 'react-router-dom';
import { addLoginUser } from '../../services/UserServiceRoute';
import { sendOtpEmail } from '../../services/resendEmail';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
    // 1. Login API call
    const loggedInUser = await addLoginUser({ email, password, name: '', role: 'Employee' });

    // 2. Save user info
    localStorage.setItem('userId', loggedInUser.userId.toString());
    localStorage.setItem('role', loggedInUser.role);

    // 3. Generate OTP
    const generatedOtp = generateOtp();

    // ✅ 4. Send OTP Email (This line is perfect)
    await sendOtpEmail(email, generatedOtp);

    // 5. Update state to show OTP input
    setSentOtp(generatedOtp);
    setShowOtpInput(true);
    setError(null);
  } catch (err) {
    console.error(err);
    setError('Login failed or unable to send OTP.');
  }
};

  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      navigate('/dashboard');
    } else {
      setError('Invalid OTP');
    }
  };

  return (
    <main className="page-container">
      <img src={backgroundImage} alt="Login background" className="background-image" />
      <div className="content-wrapper">
        <form className="form-container-login" onSubmit={handleSubmit}>
          <div className="logo-text">
            <img src={logo} alt="Company logo" />
          </div>
          <h2 className="welcome-text">Welcome Back!</h2>
          <h3 className="login-text">Log In</h3>

          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              className="styled-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              className="styled-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {showOtpInput && (
            <>
              <div className="input-container">
                <label>Enter OTP</label>
                <input
                  type="text"
                  className="styled-input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button type="button" className="login-button" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </>
          )}

          {!showOtpInput && (
            <button type="submit" className="login-button">
              Login
            </button>
          )}

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </main>
  );
}

export default Login;
