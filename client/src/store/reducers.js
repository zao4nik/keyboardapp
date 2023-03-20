/* eslint-disable default-param-last */
import ATYPES from './types';

const initialState = {
  user: {},
  isAuth: false,
  game: null,
  questions: [],
  isHidden: false,
  isWin: true,
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

    default:
      return state;
  }
};

export default redusers;
