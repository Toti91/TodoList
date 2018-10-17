import * as type from '../types';

const TodoListReducer = (state = [], action) => {
  switch (action.type) {
    case type.ADD_ITEM:
      return [...state, action.data];

    case type.TOGGLE_ITEM:
      return state.map(item => (item.key === action.data.key ? { ...item, ...action.data } : item));

    case type.REMOVE_ITEM:
      return state.filter(item => item.key !== action.data);

    case type.CLEAR_ALL_ITEMS:
      return [];

    default:
      return state;
  }
};

export default TodoListReducer;
