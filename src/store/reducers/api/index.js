import { combineReducers } from "redux";
/**
 * Collections
 */
import users from "../api/collections/users";
import tasks from "../api/collections/tasks";
/**
 * Members
 */
import task from "../api/members/task";

export default combineReducers({
  /**
   * Collections
   */
  users,
  tasks,

  /**
   * Members
   */
  task,

})
