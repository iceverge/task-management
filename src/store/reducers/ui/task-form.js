import { handleActions } from 'redux-actions'
import { taskForm } from '../../actions';

const defaultState = {
  taskFormAddShow: false,
  taskFormEditShow: false,
}

export default handleActions(
  {
    [taskForm]: (state, { payload }) => {
      const { name, value } = payload
      return {
        ...state,
        taskFormAddShow: false,
        taskFormEditShow: false,
        [name]: value,
      }
    },
  },
  defaultState
)
