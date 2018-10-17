import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistedStore from './store/store';
import TodoList from './components/TodoList';

const { store, persistor } = persistedStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <TodoList />
    </PersistGate>
  </Provider>
);

export default App;
