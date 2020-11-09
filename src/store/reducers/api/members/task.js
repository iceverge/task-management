import { handleActions } from "redux-actions";
import { taskSelected } from '../../../actions';

const defaultState = {
  task: {}
}

export default handleActions(
  {
    [taskSelected]: (state, { payload }) => {
      const { task } = payload
      return {
        ...state,
        task
      }
    }
  },
  defaultState
)