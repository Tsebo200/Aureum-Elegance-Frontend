import React, { useState } from 'react';
import './login.scss';
import backgroundImage from '../../assets/Log In Background.jpg';
import logo from '../../assets/Wordmark Logo.png';
import { useNavigate } from 'react-router-dom';
import { addLoginUser, verifyTwoFactorCode } from '../../services/UserServiceRoute';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [tempLoginData, setTempLoginData] = useState<any>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await addLoginUser({ email,
  password,
  role: 'Employee',});

if (result.is2faEnabled) {
  setTwoFactorRequired(true);
  setTempLoginData(result);           // result.userId, result.role ...
} else {
  localStorage.setItem('userId', result.userId.toString());
  localStorage.setItem('role',    result.role);
  navigate('/dashboard');
}
    } catch {
      setError('Invalid email or password');
    }
  };

  const handle2FASubmit = async () => {
    try {
      // const res = await verifyTwoFactorCode({
      //     code: twoFactorCode,
      //     secret: tempLoginData.secret, // make sure tempLoginData has a secret
      // });
      const res = await verifyTwoFactorCode(tempLoginData.userId, twoFactorCode);

      if (res.valid) {
        localStorage.setItem('userId', tempLoginData.userId.toString());
        localStorage.setItem('role', tempLoginData.role);
        navigate('/dashboard');
      } else {
        setError('Invalid 2FA code');
      }
    } catch {
      setError('Error verifying 2FA');
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
          <h3 className="login-text">{twoFactorRequired ? 'Two-Factor Code' : 'Log In'}</h3>

          {!twoFactorRequired && (
            <>
              <div className="input-container">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  className="styled-input"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}

          {twoFactorRequired && (
            <div className="input-container">
              <label className="input-label">2FA Code</label>
              <input
                type="text"
                className="styled-input"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                placeholder="Enter 6-digit code"
              />
              <button type="button" className="login-button" onClick={handle2FASubmit}>
                Verify Code
              </button>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          {!twoFactorRequired && (
            <button type="submit" className="login-button">
              Login
            </button>
          )}
        </form>
      </div>
    </main>
  );
}






