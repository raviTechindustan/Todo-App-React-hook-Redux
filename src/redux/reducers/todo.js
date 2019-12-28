
import { saveToLocalStorage, getFromLocalStorage, } from '../../utils';
const initialState = {
  todo: {},
  todos: [],
  
};

export default function (state = { ...initialState }, action) {
  switch (action.type) {
    case 'NEW_TODO_CREATED': {
      const newTodos = [...state.todos || []];
      newTodos.push(action.todo);
      saveToLocalStorage({ ...state, todos: newTodos });
      return { ...state, todos: newTodos }
    }
    case 'TODO_UPDATED': {
      const updatedTodo = action.todo;
      let todos = state.todos;
      const indexOfUpdatedTodo = todos.findIndex(item => item.id == updatedTodo.id);
      todos[indexOfUpdatedTodo] = updatedTodo;
      saveToLocalStorage({ ...state, todos });
      return { ...state, todos }
    }
    case 'TODO_DELETED': {
      const { todoId } = action;
      const updatedTodos = state.todos && state.todos.filter(item => item.id != todoId);
      saveToLocalStorage({ ...state, todos: updatedTodos });
      return { ...state, todos: updatedTodos }
    }
    case 'LOAD_INITIAL_DATA_FROM_LOCAL_STORAGE': {
      const initialState = getFromLocalStorage();
      return initialState
    }
    default:
      return state
  }
}
