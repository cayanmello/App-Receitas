import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import LoginScreen from '../pages/LoginScreen';
import App from '../App';

const EMAIL_ID = 'email-input';
const PASSWORD_ID = 'password-input';
const BUTTON_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';

describe('Testando a LoginScreen', () => {
  test(`Teste se os inputs email e senha, assim como o botão,
  são renderizados na tela`, () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(EMAIL_ID);
    const inputPassword = screen.getByTestId(PASSWORD_ID);
    const inputButton = screen.getByTestId(BUTTON_ID);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(inputButton).toBeInTheDocument();
  });
  test('Teste se o usuario é capaz de escrever nos inputs', () => {
    renderWithRouter(<LoginScreen />);

    const inputEmail = screen.getByTestId(EMAIL_ID);
    const inputPassword = screen.getByTestId(PASSWORD_ID);

    userEvent.type(inputEmail, VALID_EMAIL);
    expect(inputEmail).toHaveValue(VALID_EMAIL);

    userEvent.type(inputPassword, VALID_PASSWORD);
    expect(inputPassword).toHaveValue(VALID_PASSWORD);
  });
  test(`Teste se formulário só fica válido e o botão habilitado após um email válido e
    uma senha de mais de 6 caracteres serem preenchidos no inputs`, () => {
    renderWithRouter(<LoginScreen />);
    const inputButton = screen.getByTestId(BUTTON_ID);

    const inputEmail = screen.getByTestId(EMAIL_ID);
    userEvent.type(inputEmail, 'incorrectEmail');
    expect(inputButton).toBeDisabled();

    const inputPassword = screen.getByTestId(PASSWORD_ID);
    userEvent.type(inputPassword, '123');
    expect(inputButton).toBeDisabled();

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    expect(inputButton).toBeEnabled();
  });
  test(`Teste se rota muda para a tela principal de receitas de comidas
   após clicar no botão de validar email e senha`, () => {
    const { history } = renderWithRouter(<App />);

    const inputButton = screen.getByTestId(BUTTON_ID);
    const inputEmail = screen.getByTestId(EMAIL_ID);
    const inputPassword = screen.getByTestId(PASSWORD_ID);

    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    userEvent.click(inputButton);

    expect(history.location.pathname).toBe('/foods');

    const mealsTokenLocalStorage = localStorage.getItem('mealsToken');
    expect(mealsTokenLocalStorage).toBe('1');

    const cocktailsTokenLocalStorage = localStorage.getItem('cocktailsToken');
    expect(cocktailsTokenLocalStorage).toBe('1');
  });
});
