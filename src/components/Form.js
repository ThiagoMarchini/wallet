import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import action from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      valor: '',
      descrição: '',
      moeda: '',
      pagamento: '',
      tag: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="valor">
          Valor
          <input id="valor" name="valor" type="number" />
        </label>
        <label htmlFor="descrição">
          Descrição
          <input id="descrição" name="descrição" type="text" />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select id="moeda" name="moeda">
            <option value="TESTE">TESTE</option>
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de pagamento
          <select id="pagamento" name="pagamento">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag">
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saúde">Saúde</option>
          </select>
        </label>
        <input type="submit" value="Enviar" />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (state) => dispatch(action(state)),
});

Form.propTypes = {
  myDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Form);
// export default Form;
