export function createTodo(todo) {
  return (dispatch) => {
    dispatch({
      type: 'NEW_TODO_CREATED',
      todo
    })
  }
}

export function updateTodo(todo) {
  return (dispatch) => {
    dispatch({
      type: 'TODO_UPDATED',
      todo
    })
  }
}

export function deleteTodo(todoId) {
  return (dispatch) => {
    dispatch({
      type: 'TODO_DELETED',
      todoId
    })
  }
}

export function loadInitials(data) {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_INITIAL_DATA_FROM_LOCAL_STORAGE'
    })
  }
}

export function userRegister(data) {
  return (dispatch) => {
    dispatch({
      type:'USER_REGISTER',
      data
    })
  }
}