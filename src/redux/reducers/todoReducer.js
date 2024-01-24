import {
  ADD_DATA,
  DELETE_DATA,
  CLEAR_ALL_DATA,
  EDIT_DATA,
  UPDATE_DATA,
  SELECTED_DATA,
} from "../actions/actionTypes";

const initialState = {
  todos: [],
  isEdit: false,
  editTodo: "",
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      const { id, title } = action.payload;
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: id,
            title: title,
            isCompleted: false,
            isPending: true,
          },
        ],
        isEdit: action.isEdit,
      };
    case DELETE_DATA:
      const newTodoList = state.todos.filter((item) => item.id !== action.id);
      return {
        ...state,
        todos: newTodoList,
      };

    case EDIT_DATA:
      const editTodo = action.payload;
      let newEditTodo = state.todos.find((item) => item.id === editTodo.id);
      return {
        ...state,
        isEdit: action.isEdit,
        editTodo: newEditTodo,
      };

    case UPDATE_DATA:
      const { todoId, todoTitle } = action.payload;
      const todos = state.todos.filter((todo) => {
        return todo.id !== todoId;
      });
      const todo = state.todos.find((todo) => todo.id === todoId);
      todo.title = todoTitle;
      todo.isCompleted = todo.isCompleted;
      todo.isPending = todo.isPending;
      todos.push(todo);
  
      return {
        ...state,
        todos: [...todos],
        isEdit: false,
      };

    case CLEAR_ALL_DATA:
      return {
        ...state,
        todos: [...action.payload],
      };

    case SELECTED_DATA:
      return {
        ...state,
        todos: [...action.payload],
      };
    default:
      return state;
  }
};
export default todoReducer;
