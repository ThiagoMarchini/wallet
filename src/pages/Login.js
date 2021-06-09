import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { action } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.saveLogin = this.saveLogin.bind(this);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      redirect: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { email, password } = this.state;
    const minPasswordLength = 5;
    this.setState({
      [name]: value,
    });
    if (this.validateEmail(email) && (password.length >= minPasswordLength)) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  saveLogin(e) {
    e.preventDefault();
    const { myDispatch } = this.props;
    const { email, password } = this.state;
    if (email && password) {
      myDispatch({ type: 'LOGIN', payload: email });
      this.setState({ redirect: true });
    }
  }

  // Função de validação de email com regex retirada de: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }
    const { isDisabled } = this.state;
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
        <button
          type="button"
          onClick={ this.saveLogin }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (state) => dispatch(action(state)),
});

Login.propTypes = {
  myDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
