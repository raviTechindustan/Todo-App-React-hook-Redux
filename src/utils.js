export function saveToLocalStorage(data) {
  return localStorage.setItem("todos", JSON.stringify(data))
}

export function getFromLocalStorage() {
  let data = {};
  if(localStorage.getItem("todos") !== null) {
    data = JSON.parse(localStorage.getItem("todos"));
  }
  return data;
}