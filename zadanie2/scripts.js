"use strict"

/* DATA HOSTING */

let todoList = []; // Declares a new array for Your to-do list

const BASE_URL = "https://api.jsonbin.io/v3/b/652956660574da7622b86ba4";
const SECRET_KEY = "$2a$10$k6rJFntlGv4uRtrF6Kh1MO.f1AIzeGDuHvMWwgoewjf6lbsGqaX2a";

// Fetching data from the JSON bin using AJAX GET request
$.ajax({
    url: BASE_URL,
    type: 'GET',
    headers: { // Required only if you are trying to access a private bin
        'X-Master-Key': SECRET_KEY,
        'X-Bin-Meta': false // To retrieve only the data and not the metadata
    },
    success: (data) => {
        // Updating todoList array with data from JSON response
        todoList = data;
    },
    error: (err) => {
        console.log(err.response);
    }
});

// Updating the JSON bin with the updated todoList array using AJAX PUT request
let updateJSONbin = function () {
    $.ajax({
        url: BASE_URL,
        type: 'PUT',
        headers: { // Required only if you are trying to access a private bin
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


/* TO-DO LIST FUNCTIONS */

// Adding a new to-do item to the list
let addTodo = function () {
    // Getting the references to the input fields
    let inputTitle = $("#inputTitle");
    let inputDescription = $("#inputDescription");
    let inputPlace = $("#inputPlace");
    let inputDate = $("#inputDate");

    // Getting the values from the input fields
    let newTitle = inputTitle.val();
    let newDescription = inputDescription.val();
    let newPlace = inputPlace.val();
    let newDate = new Date(inputDate.val());

    // Creating a new to-do item object
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };

    // Adding the new to-do item to the array
    todoList.push(newTodo);

    // Storing the updated to-do list in the local storage
    window.localStorage.setItem("todos", JSON.stringify(todoList));

    updateJSONbin();
}

// Updating the displayed to-do list
let updateTodoList = function () {
    let todoListTable = $("#todoListContent");

    // Removing all elements
    todoListTable.empty();

    // Filtering data according to the user input
    let filterInput = $("#inputSearch").val().toLowerCase();
    let fromDate = new Date($("#inputFromDate").val());
    let toDate = new Date($("#inputToDate").val());

    // Needed for showing / hiding the table
    let hasItems = false;

    // Iterating over the todoList array and adding new rows to the table
    $.each(todoList, function (index, todo) {
        let todoDueDate = new Date(todo.dueDate).toDateString();

        // Checking if the to-do item should be displayed (filtering)
        if (
            (filterInput === "" || todo.title.toLowerCase().includes(filterInput)
                || todo.description.toLowerCase().includes(filterInput))
            && (isNaN(fromDate.getTime()) || todoDueDate >= fromDate)
            && (isNaN(toDate.getTime()) || todoDueDate <= toDate)
        ) {
            hasItems = true;
            // Creating a new row for the matching to-do item
            let newRow = $("<tr>");
            newRow.append($("<td>" + todo.title + "</td>"));
            newRow.append($("<td>" + todo.description + "</td>"));
            newRow.append($("<td>" + todo.place + "</td>"));
            newRow.append($("<td>" + todoDueDate + "</td>"));

            // Creating a new button for deleting the to-do item
            let newDeleteButton = $("<input class='delete-btn btn btn-outline-danger' type='button' value='x'>");
            newDeleteButton.on("click", function () {
                deleteTodo(index);
            });
            newRow.append($("<td>").append(newDeleteButton));

            // Appending the new row to the table
            todoListTable.append(newRow);
        }
    });

    if (hasItems) {
        $("#todoListView").slideDown();
    } else {
        $("#todoListView").slideUp();
    }
}
// Calling the updateTodoList function every second
setInterval(updateTodoList, 1000);

// Deleting a to-do item from the list
let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONbin();
}
