import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import TodoList from './reducers/todolist.reducer';

/*
    This redux store configuration uses the redux-persist library to save
    the store to localstorage (AsyncStorage)
*/

const reducer = combineReducers({
  TodoList,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
