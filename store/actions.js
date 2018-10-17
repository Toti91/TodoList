import * as type from "./types";
import getId from "../utils/getId";

export const addItem = newItem => ({
  type: type.ADD_ITEM,
  data: { key: getId(), value: newItem, toggled: false }
});

export const editItem = item => ({
  type: type.EDIT_ITEM,
  data: { key: item.key, value: item.value, toggled: !item.toggled }
});

export const removeItem = item => ({
  type: type.REMOVE_ITEM,
  data: item.key
});
