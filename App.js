import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store/store";
import TodoList from "./components/TodoList";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }
}
