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
function listExist(userInput, lists) {
    for(var i=0; i < lists.length; i++) {
        if(lists[i].name === userInput) {
            return true;
        }
    }
    return false;
}
function returnStars(listArray, listName) {
    for (var i = 0; i < listArray.length; i++) {
        if (listArray[i].name === listName) {
            return listArray[i].stars;
        }
    }
}
function isStar(starsArray, itemName) {
    if(starsArray !== undefined) {
        for(var i=0; i <starsArray.length; i++) {
            if(starsArray[i] === itemName) {
                return true;
            }
        }
    }
    return false;
}