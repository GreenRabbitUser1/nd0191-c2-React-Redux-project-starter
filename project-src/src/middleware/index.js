
//  import applyMiddleware to combine the middleware
import { applyMiddleware } from "redux";
//  import thunk to allow for async operations to occur before the middleware happens
import { thunk } from "redux-thunk";
//  import all the middlewares
import logger from "./logger";


//  export all the middlewares with applyMiddleware
//  thunk must be first if there are async operations
export default applyMiddleware(thunk, logger);
