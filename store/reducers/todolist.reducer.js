import * as type from "../types";

const TodoListReducer = (state = [], action) => {
  switch (action.type) {
    case type.ADD_ITEM:
      console.log(action.data);
      return [...state, action.data];

    case type.EDIT_ITEM:
      const i = state.findIndex(x => x.key === action.data.key);
      let arr = [...state];
      arr[i] = action.data;

      return arr;

    case type.REMOVE_ITEM:
      return state.filter(item => item.key !== action.data);

    default:
      return state;
  }
};

export default TodoListReducer;
