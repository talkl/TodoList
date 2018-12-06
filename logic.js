function returnTodos(listArray, listName) {
    for (var i = 0; i < listArray.length; i++) {
        if (listArray[i].name === listName) {
            return listArray[i].todos;
        }
    }
}
function returnCompleted(listArray, listName) {
    for (var i = 0; i < listArray.length; i++) {
        if (listArray[i].name === listName) {
            return listArray[i].completed;
        }
    }
}
