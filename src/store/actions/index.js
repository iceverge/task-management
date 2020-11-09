import { createActions } from "redux-actions";

const {
  task,
  taskCreate,
  taskDelete,
  taskForm,
  taskSelected,
  taskUpdate,
  users,
} = createActions({
  TASK: ({ task }) => ({ task }),
  TASK_CREATE: ({ name, value }) => ({ name, value }),
  TASK_DELETE: ({ taskId }) => ({ taskId }),
  TASK_FORM: ({ name, value }) => ({ name, value }),
  TASK_SELECTED: ({ task }) => ({ task }),
  TASK_UPDATE: ({ task }) => ({ task }),
  USERS: ({ users }) => ({ users }),
});


export {
  task,
  taskCreate,
  taskDelete,
  taskForm,
  taskSelected,
  taskUpdate,
  users,
};
