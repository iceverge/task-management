import { handleActions } from "redux-actions";
import { users } from "../../../actions";

const defaultState = {
  users: [],
};

export default handleActions(
  {
    [users]: (state, { payload }) => {
      const { users } = payload;
      return {
        ...state,
        users: [...state.users, users]
      };
    }
  },
  defaultState
);
