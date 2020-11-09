import req from "superagent";
import serializer from "superagent-serializer";
import { resolve } from "url";
import { apiUrl, accessToken } from "./config";

serializer(req, "camel");

// let store;

const setDefaultHeaders = () => ({ Authorization: `Bearer ${accessToken}` })

const unauthorizedRedirect = req =>
  req.on("response", res => {
    if (res.status === 401 && typeof window !== "undefined") {
      // Supposedly this should be redirect to logout.
      // But since we are not implementing a login and logout page
      // so this should be fine.
      window.location = '/unauthorized';
    }
  });

export const setStore = s => s;

export const post = (path, rest) =>
  req
    .post(resolve(apiUrl, path))
    .send(rest)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set(setDefaultHeaders())
    .use(unauthorizedRedirect);

export const put = (path, ...rest) =>
  req
    .put(resolve(apiUrl, path), ...rest)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set(setDefaultHeaders())
    .use(unauthorizedRedirect);

export const patch = (path, ...rest) =>
  req
    .patch(resolve(apiUrl, path), ...rest)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set(setDefaultHeaders())
    .use(unauthorizedRedirect);

export const del = (path, ...rest) =>
  req
    .del(resolve(apiUrl, path), ...rest)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set(setDefaultHeaders())
    .use(unauthorizedRedirect);

export const get = async (path, ...rest) =>
  req
    .get(resolve(apiUrl, path), ...rest)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set(setDefaultHeaders())
    .use(unauthorizedRedirect);

export const head = (path, ...rest) =>
  req
    .head(resolve(apiUrl, path), ...rest)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set(setDefaultHeaders())
    .use(unauthorizedRedirect);
