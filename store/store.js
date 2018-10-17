import { createStore, combineReducers } from "redux";
import TodoList from "./reducers/todolist.reducer";

const reducers = combineReducers({
  TodoList
});

const store = createStore(reducers);

export default store;
