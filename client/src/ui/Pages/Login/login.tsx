import React, { useState } from 'react';
import './login.scss';
import backgroundImage from '../../assets/Log In Background.jpg';
import logo from '../../assets/Wordmark Logo.png';
import { useNavigate } from 'react-router-dom';
import { addLoginUser } from '../../services/UserServiceRoute';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await addLoginUser({ email, password, name: '', role: 'Employee' });
      // ✅ On success, navigate to dashboard
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
