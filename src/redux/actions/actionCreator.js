import {
  ADD_DATA,
  DELETE_DATA,
  CLEAR_ALL_DATA,
  EDIT_DATA,
  UPDATE_DATA,
 
  SELECTED_DATA,
} from "./actionTypes";

export const addNewTodo = (todo) => {
  return {
    type: ADD_DATA,
    payload: {
      id: Date.now(),
      title: todo.title,
    },
  };
};
export const deleteTodo = (id) => {
  return {
    type: DELETE_DATA,
    id,
  };
};

export const clearAlltodo = (todo) => {
  return {
    type: CLEAR_ALL_DATA,
    payload:todo
  };
};

export const editTodo = (id) => {
  return {
    type: EDIT_DATA,
    payload: {
      id: id,
    },
    isEdit: true,
  };
};

export const updateTodo = (id, todo) => {
  return {
    type: UPDATE_DATA,
    payload: {
      todoId: id,
      todoTitle: todo.title,
    },
  };
};

export const seleceteddata = (todo) => {
  return {
    type: SELECTED_DATA,
    payload: todo,
  };
};
