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


export function loadInitialsForAuth() {
  return (dispatch) => {
    dispatch({
      type: 'INITIALIZE_AUTH'
    })
  }
}
export function userRegister(data) {
  return (dispatch) => {
    dispatch({
      type:'USER_REGISTERATION_IS_SUCCESSFUL',
      data
    })
  }
}

export function loginUserRecord(data) {
  return (dispatch) => {
    dispatch ({
      type:'LOGIN_USER_DATA',
      data
    })
  }
}

export function userLogout() {
  return (dispatch) => {
    dispatch ({
      type: 'LOGOUT'
    })
  }
}