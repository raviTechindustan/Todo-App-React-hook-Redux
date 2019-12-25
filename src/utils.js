export function saveToLocalStorage(data) {
  return localStorage.setItem("todos", JSON.stringify(data))
}

export function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("todos"));
}