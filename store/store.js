import { statReducer } from "./reducers/stats.reducers.js"
import { todoReducer } from "./reducers/todo.reducers.js"
import { userReducer } from "./reducers/user.reducers.js"

const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
  todoModule: todoReducer,
  userModule: userReducer,
  statModule: statReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose
export const store = createStore(rootReducer, middleware)

// export const store = createStore(appReducer)
window.gStore = store