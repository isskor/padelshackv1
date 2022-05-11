const init = {
  query: '',
  price: [],
  rest: {
    stars: [],
    category: [],
    subs: [],
    color: [],
    brand: [],
    shape: [],
  },
};

export const searchReducer = (state = init, action) => {
  switch (action.type) {
    case 'SEARCH_QUERY':
      return { ...init, query: action.payload };
    case 'FILTERS_CHANGE':
      return { ...state, rest: { ...state.rest, ...action.payload } };
    case 'FILTER_PRICE':
      return { ...state, price: action.payload };
    case 'CLEAR_FILTERS':
      return init;
    case 'FILTER_BRAND':
      return { ...init, rest: { ...init.rest, brand: action.payload } };
    case 'FILTER_CATEGORY':
      return { ...init, rest: { ...init.rest, category: action.payload } };
    case 'FILTER_SUB':
      return { ...init, rest: { ...init.rest, subs: [action.payload] } };
    default:
      return state;
  }
};
