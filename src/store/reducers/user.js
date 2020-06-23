import { LOGIN, LOGOUT } from "../actions/user";

const initialState = {isAuthed:'FALSE', fullname: '', email: ''};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload

    case LOGOUT:
      return state - action.payload;

    default:
      return state;
  }
};
