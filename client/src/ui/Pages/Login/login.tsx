import React from 'react';
import './login.scss';
<<<<<<<< HEAD:client/src/ui/Pages/login.tsx
import backgroundImage from '../assets/Log In Background.jpg';
import logo from '../assets/Wordmark Logo.png';
========
import backgroundImage from '../../assets/Log In Background.jpg';
import logo from '../../assets/Wordmark Logo.png';
>>>>>>>> Tshwetso:client/src/ui/Pages/Login/login.tsx
import { Link } from 'react-router-dom';

export function Login() {
  const handleSubmit = (_event: React.SyntheticEvent) => {
    _event.preventDefault();
    // Handle form submission
  };

  return (
    <main className="page-container">
<<<<<<<< HEAD:client/src/ui/Pages/login.tsx
      <img
        src={backgroundImage}
        alt="Login page background"
        className="background-image"
========
      <img 
        src={backgroundImage} 
        alt="Login page background" 
        className="background-image" 
>>>>>>>> Tshwetso:client/src/ui/Pages/Login/login.tsx
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
            />
          </div>

          <div className="input-container">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="styled-input"
              required
              aria-label="Password"
            />
          </div>
<<<<<<<< HEAD:client/src/ui/Pages/login.tsx

          <Link to= '/dashboard'>
========
          <Link to="/dashboard">
>>>>>>>> Tshwetso:client/src/ui/Pages/Login/login.tsx
            <button type="submit" className="login-button">
              Log In
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Login;