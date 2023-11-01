"use strict"
let todoList = []; //declares a new array for Your todo list


const BASE_URL = "https://api.jsonbin.io/v3/b/6542a6d912a5d37659938cdb";
const SECRET_KEY = "$2a$10$2nKbyBRgLZai1PueAEsk1uG/M8oqgBQIUexsjD7qFDf9Q.dNewgDe";
$.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: BASE_URL,
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
        'X-Master-Key': SECRET_KEY,
        'X-Bin-Meta': false
    },
    success: (data) => {
        // console.log(data);
        todoList = data;
    },
    error: (err) => {
        console.log(err.response);
    }
});

let updateJSONbin = function () {
    $.ajax({
        url: BASE_URL,
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'X-Master-Key': SECRET_KEY
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.response);
        }
    });
}


let updateTodoList = function () {
    let todoListDiv = $("#todoListView");

    //remove all elements
    todoListDiv.empty();

    //add all elements
    let filterInput = $("#inputSearch");


    $.each(todoList, function (index, todo) {
        if (
            (filterInput.val() === "") ||
            (todo.title.includes(filterInput.val())) ||
            (todo.description.includes(filterInput.val()))
        ) {
            let newElement = $("<p>" + todo.title + " " + todo.description + "</p>");

            let newDeleteButton = $("<input type='button' value='x'>");
            newDeleteButton.on("click", function () {
                deleteTodo(index)
            });

            newElement.append(newDeleteButton);
            todoListDiv.append(newElement);
        }
    });
}
setInterval(updateTodoList, 1000);

// KROK 3C
let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONbin();
}

// KROK 3B
let addTodo = function () {
    //get the elements in the form
    let inputTitle = $("#inputTitle");
    let inputDescription = $("#inputDescription");
    let inputPlace = $("#inputPlace");
    let inputDate = $("#inputDate");

    //get the values from the form
    let newTitle = inputTitle.val();
    let newDescription = inputDescription.val();
    let newPlace = inputPlace.val();
    let newDate = new Date(inputDate.val());

    //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };

    //add item to the list
    todoList.push(newTodo);

    // KROK 3D
    window.localStorage.setItem("todos", JSON.stringify(todoList));

    updateJSONbin();
}
