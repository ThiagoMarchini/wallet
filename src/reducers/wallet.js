// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'GET_CURRENCY':
    return {
      ...state,
      currencies: [
        Object.keys(action.payload).filter((entry) => entry !== 'USDT'),
        action.payload,
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
