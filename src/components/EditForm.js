import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { action, fetchData } from '../actions';

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      valor: undefined,
      descricao: undefined,
      moeda: undefined,
      'método de pagamento': undefined,
      tag: undefined,
    };
  }

  componentDidMount() {
    const { myDispatchToFetch } = this.props;
    myDispatchToFetch();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { entradas, cotacoes, myDispatch, myDispatchToFetch } = this.props;
    await myDispatchToFetch();
    const { valor, descricao, 'método de pagamento': pagamento, moeda, tag } = this.state;
    let newId = 0;
    if (entradas.length > 0) {
      newId = (entradas[entradas.length - 1].id) + 1;
    }
    if (valor && descricao && pagamento && moeda && tag) {
      myDispatch({
        type: 'ADD_EXPENSE',
        payload: {
          id: newId,
          value: valor,
          currency: moeda,
          method: pagamento,
          tag,
          description: descricao,
          exchangeRates: cotacoes,
        },
      });
    }
  }

  render() {
    const { moeda, 'método de pagamento': pagamento, tag } = this.state;
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
            {/* <option default>Selecione</option> */}
            { Array.isArray(moedas) ? (moedas.map((entry) => (
              <option key={ entry } value={ entry }>{ entry }</option>))) : '' }
          </select>
        </label>
        <label htmlFor="método de pagamento">
          Método de pagamento
          <select
            id="método de pagamento"
            name="método de pagamento"
            value={ pagamento }
            onChange={ this.handleChange }
          >
            {/* <option default>Selecione</option> */}
            <option key="dinheiro" value="dinheiro">Dinheiro</option>
            <option key="credito" value="credito">Cartão de crédito</option>
            <option key="debito" value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select id="tag" name="tag" value={ tag } onChange={ this.handleChange }>
            {/* <option default>Selecione</option> */}
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
  entradas: state.wallet.expenses,
});

Form.propTypes = {
  cotacoes: PropTypes.objectOf(PropTypes.any),
  entradas: PropTypes.arrayOf(PropTypes.any),
  moedas: PropTypes.arrayOf(PropTypes.any),
  myDispatch: PropTypes.func.isRequired,
  myDispatchToFetch: PropTypes.func.isRequired,
};

Form.defaultProps = {
  cotacoes: {},
  moedas: [],
  entradas: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
