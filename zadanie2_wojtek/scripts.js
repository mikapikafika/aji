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
    let todoListTable = $("#todoTable");

    //remove all elements
    todoListTable .empty();

    //add all elements
    let filterInput = $("#inputSearch");


    $.each(todoList, function (index, todo) {
        let todoDueDate = new Date(todo.dueDate).toDateString();
        if (
            (filterInput.val() === "") ||
            (todo.title.includes(filterInput.val())) ||
            (todo.description.includes(filterInput.val()))
        ) {
            var newRow = $("<tr>");
            newRow.append("<td>" + todo.title + "</td>");
            newRow.append("<td>" + todo.description + "</td>");
            newRow.append("<td>" + todo.place + "</td>");
            newRow.append("<td>" + todoDueDate + "</td>");
            let newDeleteButton = $("<input class='delete-btn btn btn-outline-danger' type='button' value='x'>");
            newDeleteButton.on("click", function () {
                deleteTodo(index)
            });
            newRow.append(newDeleteButton);

            todoListTable.append(newRow);
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

    window.localStorage.setItem("todos", JSON.stringify(todoList));

    updateJSONbin();
}
