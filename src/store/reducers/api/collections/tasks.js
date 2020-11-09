import { handleActions } from "redux-actions";
import { task, taskDelete, taskUpdate } from "../../../actions";

const defaultState = {
  tasks: [],
};

export default handleActions(
  {
    [task]: (state, { payload }) => {
      const { task } = payload;
      return {
        ...state,
        tasks: [...state.tasks, task]
      };
    },
    [taskUpdate]: (state, { payload }) => {
      const newTask = payload.task;
      const tasks = state.tasks
      const updatedTasks = tasks.filter(task => {
        return task.id !== newTask.id
      })
      return {
        ...state,
        tasks: [...updatedTasks, newTask]
      };
    },
    [taskDelete]: (state, { payload }) => {
      const { taskId } = payload
      const tasks = state.tasks
      const updatedTasks = tasks.filter(task => {
        return task.id !== taskId
      })
      return {
        ...state,
        tasks: updatedTasks
      };
    },
  },
  defaultState
);
