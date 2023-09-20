import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import '../styles/pages/LoginScreen.css';
import logo from '../images/logo.png';

function LoginScreen() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disabledButton = () => {
    const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;
    const emailValidation = regexEmail.test(email);
    const minPassword = 6;
    const passwordValidation = password.length > minPassword;
    if (emailValidation && passwordValidation) {
      return false;
    }
  };

  const enableButton = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <body className="container-body-login">
      <header className="container-header-login">
        <h1>Let is Cooking</h1>
        <h2>Find best recipes for cooking</h2>
        <a
          href="#container-main-login"
          className="btn-start"
        >
          <MdKeyboardArrowDown className="icon-bottom" />
        </a>
      </header>
      <main id="container-main-login" className="container-main-login">
        <img
          src={ logo }
          alt="App logo composed by the name tastyRecipes
          and a chef's hat icon"
        />

        <div className="container-login">
          <h3>Login</h3>
          <input
            type="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ (event) => setEmail(event.target.value) }
          />
          <input
            type="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ (event) => setPassword(event.target.value) }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ disabledButton() }
            onClick={ enableButton }
            className="btn-login"
          >
            Login
          </button>
        </div>
      </main>
    </body>
  );
}

export default LoginScreen;
