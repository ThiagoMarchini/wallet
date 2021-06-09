import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { action, fetchData } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const { myDispatchToFetch } = this.props;
    myDispatchToFetch();

    this.state = {
      valor: '',
      descricao: '',
      moeda: '',
      pagamento: '',
      tag: '',
    };
  }

  // componentDidMount() {
  //   const { myDispatchToFetch } = this.props;
  //   myDispatchToFetch();
  // }

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
    const { moeda, pagamento, tag } = this.state;
    const { moedas } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input onChange={ this.handleChange } id="valor" name="valor" type="number" />
        </label>
        <label htmlFor="descricao">
          Descrição
          <textarea name="descricao" id="descricao" onChange={ this.handleChange } />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select id="moeda" name="moeda" value={ moeda } onChange={ this.handleChange }>
            { Array.isArray(moedas) ? (moedas.map((entry) => (
              <option key={ entry } value={ entry }>
                { entry }
              </option>))) : '' }
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de pagamento
          <select
            id="pagamento"
            name="pagamento"
            value={ pagamento }
            onChange={ this.handleChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" value={ tag } onChange={ this.handleChange }>
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleSubmit }>Adicionar Despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (state) => dispatch(action(state)),
  myDispatchToFetch: () => dispatch(fetchData()),
});

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies[0],
  cotacoes: state.wallet.currencies[1],
});

Form.propTypes = {
  moedas: PropTypes.arrayOf(PropTypes.any),
  // myDispatch: PropTypes.func.isRequired,
  myDispatchToFetch: PropTypes.func.isRequired,
};

Form.defaultProps = {
  moedas: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
