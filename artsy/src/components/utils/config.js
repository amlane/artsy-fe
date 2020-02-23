let baseURL;

const NODE_ENV = process.env.REACT_APP_FORCE_NODE_ENV || process.env.NODE_ENV;

if (NODE_ENV === "development") {
  baseURL = "http://localhost:4000/api";
  // baseURL = "https://artsy-be.herokuapp.com/api";
} else if (NODE_ENV === "production") {
  baseURL = "https://artsy-be.herokuapp.com/api";
}

export { baseURL };
