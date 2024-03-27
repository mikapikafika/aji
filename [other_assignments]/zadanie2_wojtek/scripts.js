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
        if (data.empty === true) {
            console.log("No data in the JSON bin");
        } else {
            todoList = data;
        }
    },
    error: (err) => {
        console.log(err.response);
    }
});

let updateJSONbin = function () {
    let dataToSend;
    if (todoList.length > 0) {
        dataToSend = JSON.stringify(todoList);
    } else {
        dataToSend = JSON.stringify({empty: true});
    }
    $.ajax({
        url: BASE_URL,
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'X-Master-Key': SECRET_KEY
        },
        contentType: 'application/json',
        data: dataToSend,
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
    todoListTable.empty();

    let fromDate = new Date($("#inputFromDate").val());
    let toDate = new Date($("#inputToDate").val());
    let filterInput = $("#inputSearch").val().toLowerCase();


    $.each(todoList, function (index, todo) {
        let todoDueDate = new Date(todo.dueDate);
        if (
            ((filterInput === "") ||
                (todo.title.toLowerCase().includes(filterInput)) ||
                (todo.description.toLowerCase().includes(filterInput)))
            && (isNaN(fromDate.getTime()) || todoDueDate >= fromDate)
            && (isNaN(toDate.getTime()) || todoDueDate <= toDate)
        ) {
            var newRow = $("<tr>");
            newRow.append("<td>" + todo.title + "</td>");
            newRow.append("<td>" + todo.description + "</td>");
            newRow.append("<td>" + todo.place + "</td>");
            newRow.append("<td>" + todoDueDate.toDateString() + "</td>");
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

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONbin();
}

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

    // window.localStorage.setItem("todos", JSON.stringify(todoList));

    updateJSONbin();
}