export function pushData (data) {
  console.log("inside tghe action")
  return (dispatch) =>{
    dispatch({
      type:'inputdata',
      payload:data
    })
  }
}