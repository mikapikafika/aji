"use strict"

let todoList = []; //declares a new array for Your todo list

const BASE_URL = "https://api.jsonbin.io/v3/b/652956660574da7622b86ba4";
const SECRET_KEY = "$2a$10$k6rJFntlGv4uRtrF6Kh1MO.f1AIzeGDuHvMWwgoewjf6lbsGqaX2a";
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
    let todoListTable = $("#todoListContent");

    //remove all elements
    todoListTable.empty();

    //add all elements
    let filterInput = $("#inputSearch").val();
    let fromDate = new Date($("#inputFromDate").val());
    let toDate = new Date($("#inputToDate").val());

    $.each(todoList, function (index, todo) {
        let todoDueDate = new Date(todo.dueDate).toDateString();

        if (
            (filterInput === "" || todo.title.includes(filterInput) || todo.description.includes(filterInput))
            && (isNaN(fromDate.getTime()) || todoDueDate >= fromDate)
            && (isNaN(toDate.getTime()) || todoDueDate <= toDate)
        ) {
            let newRow = $("<tr>");
            newRow.append($("<td>" + todo.title + "</td>"));
            newRow.append($("<td>" + todo.description + "</td>"));
            newRow.append($("<td>" + todo.place + "</td>"));
            newRow.append($("<td>" + todoDueDate + "</td>"));

            let newDeleteButton = $("<input class='delete-btn btn btn-danger' type='button' value='x'>");
            newDeleteButton.on("click", function () {
                deleteTodo(index);
            });
            newRow.append($("<td>").append(newDeleteButton));

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

    window.localStorage.setItem("todos", JSON.stringify(todoList));

    updateJSONbin();
}