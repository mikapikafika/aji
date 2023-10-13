"use strict"
let todoList = []; //declares a new array for Your todo list

// KROK 3
let initList = function() {
    // KROK 3D
    let savedList = window.localStorage.getItem("todos");
    if (savedList != null)
        todoList = JSON.parse(savedList);
    else     //code creating a default list with 2 items
        todoList.push(
        {
            title: "Learn JS",
            description: "Create a demo application for my TODO's",
            place: "445",
            dueDate: new Date(2019,10,16)
        },
        {
            title: "Lecture test",
            description: "Quick test from the first three lectures",
            place: "F6",
            dueDate: new Date(2019,10,17)
        }
        // of course the lecture test mentioned above will not take place
    );
}
//initList();

// KROK 4
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

let updateJSONbin = function() {
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


// KROK 3A
let updateTodoList = function() {
    let todoListDiv = $("#todoListView");

    //remove all elements
    todoListDiv.empty();

    // KROK 3E
    //add all elements
    let filterInput = $("#inputSearch");

    // for (let todo in todoList) {
    //     if (
    //         (filterInput.value === "") ||
    //         (todoList[todo].title.includes(filterInput.value)) ||
    //         (todoList[todo].description.includes(filterInput.value))
    //     ) {
    //         let newElement = document.createElement("p");
    //         let newContent = document.createTextNode(todoList[todo].title + " " +
    //             todoList[todo].description);
    //         newElement.appendChild(newContent);
    //
    //         // KROK 3C
    //         let newDeleteButton = document.createElement("input");
    //         newDeleteButton.type = "button";
    //         newDeleteButton.value = "x";
    //         newDeleteButton.addEventListener("click",
    //             function() {
    //                 deleteTodo(todo);
    //             });
    //
    //         newElement.appendChild(newDeleteButton);
    //         todoListDiv.appendChild(newElement);
    //     }
    // }

    // KROK 8 JQUERY
    $.each(todoList, function (index, todo) {
        if (
                (filterInput.val() === "") ||
                (todo.title.includes(filterInput.val())) ||
                (todo.description.includes(filterInput.val()))
            ) {
                let newElement =  $("<p>" + todo.title + " " + todo.description + "</p>");

                let newDeleteButton = $("<input class='delete-btn btn btn-danger' type='button' value='x'>");
                newDeleteButton.on("click", function() {
                    deleteTodo(index)
                });

                newElement.append(newDeleteButton);
                todoListDiv.append(newElement);
        }
    });
}
setInterval(updateTodoList, 1000);

// KROK 3C
let deleteTodo = function(index) {
    todoList.splice(index,1);
    updateJSONbin();
}

// KROK 3B
let addTodo = function() {
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