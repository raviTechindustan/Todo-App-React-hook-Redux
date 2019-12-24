
const initialState = {
  todo: {
    id: '',
    title: '',
    created: '',
    modified: '',
    description: '',
    archive: false
  },
  todos:[]
};

export default function (state = { ...initialState }, action) {
  switch (action.type) {
    case 'inputdata':
      console.log(action.payload,"inside the reducer")
      let {todos} = state
      todos.push(action.payload)
      return { ...state, todo: action.payload,}
      default:
        return state
  }
}
