import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { email, password } = this.state;
    const minPasswordLength = 6;
    this.setState({
      [name]: value,
    });
    if (this.validateEmail(email) && (password.length >= minPasswordLength)) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  // Função de validação de email com regex retirada de: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    const { isDisabled } = this.state;
    console.log(this.state);
    return (
      <form>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            name="email"
            onChange={ this.handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
        </label>
        <button type="submit" disabled={ isDisabled }>Entrar</button>
      </form>
    );
  }
}

export default Login;
