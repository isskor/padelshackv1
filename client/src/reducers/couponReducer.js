let initialState = false;

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COUPON_APPLIED':
      return action.payload;
    default:
      return state;
  }
};
