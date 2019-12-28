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

export function generateRandomString(length = 400) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getObject(name) {
  if (localStorage.getItem(name) !== null) {
    return JSON.parse(localStorage.getItem(name))
  }
  return null
}

export function setObject(name, data) {
  return localStorage.setItem(name, JSON.stringify(data));
}