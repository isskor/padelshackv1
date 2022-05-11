export const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_SIDE_DRAWER':
      return action.payload;

    default:
      return state;
  }
};
