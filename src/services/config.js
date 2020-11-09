const {
  NODE_ENV: nodeEnv,
  DEBUG: debugStr,
  PORT: port,
  REACT_APP_API_URL: apiUrl,
  REACT_APP_ACCESS_TOKEN: accessToken,
} = process.env;

const debug = debugStr === "true";

module.exports = {
  nodeEnv,
  debug,
  port,
  apiUrl,
  accessToken,
};
