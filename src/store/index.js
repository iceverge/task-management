import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import { debug } from "../services/config";
import { get, setStore } from "../services/request";
import { users, task } from '../store/actions';

const middleware = [];
const initialState = {};
const enhancers = [];

if (debug) {
  const { logger } = require("redux-logger");
  middleware.push(logger);
}

middleware.push(thunk);

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension);
  }
}

const composeEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(reducers, initialState, composeEnhancers);

/**
 * @dev Set store before dispatching any additional calls
 */
setStore(store);

get("/user").then(res => store.dispatch(users({ users: res.results })));
get('/task/lead_59a79b6cb211449f9698bad058a593e4').then(res => {
  res.results.map(result => store.dispatch(task({ task: result })))
});

export { store };

