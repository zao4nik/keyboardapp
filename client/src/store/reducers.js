/* eslint-disable default-param-last */
import ATYPES from './types';

const initialState = {
  user: {},
  isAuth: false,
  game: null,
  questions: [],
  isHidden: false,
  isWin: true,
  counterData: {
    counter_state: 0,
    counter_end: 0,

  },
};

const redusers = (state = initialState, action) => {
  switch (action.type) {
    case ATYPES.SET_USER:
      return { ...state, user: action.payload, isAuth: true };

    case ATYPES.SIGN_OUT_USER:
      return { ...state, user: action.payload, isAuth: false };

    case ATYPES.IS_HIDDEN:
      return { ...state, isHidden: action.payload };

    case ATYPES.IS_WIN:
      return { ...state, isWin: action.payload };

    case ATYPES.COUNTER_DATA:
      return {
        ...state,
        counterData:
          { counter_state: action.payload.rightCount + 1, counter_end: action.payload.data },
      };

    default:
      return state;
  }
};

export default redusers;
