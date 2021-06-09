// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_CURRENCY':
    console.log(action);
    return {
      ...state,
      currencies: [
        Object.keys(action.payload).filter((entry) => entry !== 'USDT'),
        Object.entries(action.payload).map((entry) => entry),
      ],
    };
  case 'FAILED_REQUEST':
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
