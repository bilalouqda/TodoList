// localStorage.getItem('todos')   // Récupérer les todos depuis le stockage local
// localStorage.setItem('todos', JSON.stringify(slicedTodos)); // Mettre à jour le stockage local
// const newTodoTitle = todoInput.value.trim();

let file = "https://jsonplaceholder.typicode.com/todos";
let slicedTodos = [];

function fetchTodos() {
    fetch(file)
        .then(response => response.json())
        .then(todos => {
            slicedTodos = todos.slice(0, 10);
            localStorage.setItem('todos', JSON.stringify(todos)); 
            displayTodos(slicedTodos);
        })
        .catch(err => console.log(err));
}

document.addEventListener('DOMContentLoaded', function () {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    console.log(storedTodos);
    if (storedTodos) {
        slicedTodos = storedTodos.slice(0, 10);
        displayTodos(slicedTodos);
    } else {
        fetchTodos();
    }

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredTodos = slicedTodos.filter(todo => todo.title.toLowerCase().includes(searchTerm));
        displayTodos(filteredTodos);
    });

    const addTodoBtn = document.getElementById('addTodoBtn');
    addTodoBtn.addEventListener('click', function () {
        const todoInput = document.getElementById('todoInput');
        const newTodoTitle = todoInput.value;
        if (newTodoTitle !== '') {
            addTodo(newTodoTitle);
            todoInput.value = ''; 
        }
    });


    const todoList = document.getElementById('todoList');
    todoList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete')) {
            const todoId = parseInt(event.target.getAttribute('data-id'));
            console.log("todoId",todoId);
            deleteTodo(todoId);
        }
    });

    const deleteAllBtn = document.getElementById('DeleteAll');
    deleteAllBtn.addEventListener('click', function () {
        localStorage.clear('todos');
        slicedTodos = []; 
        displayTodos(slicedTodos);
    });

});

function displayTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.classList.add('item');
        listItem.textContent = todo.title;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn','delete');
        deleteBtn.setAttribute('data-id', todo.id);

        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);
    });
}

function addTodo(title) {
    const newTodo = { userId: 1, id: 11, title: title, completed: false };
    slicedTodos.unshift(newTodo); 
    localStorage.setItem('todos', JSON.stringify(slicedTodos)); 
    displayTodos(slicedTodos);
}


function deleteTodo(todoId) {
    slicedTodos = slicedTodos.filter(todo => todo.id !== todoId);
    localStorage.setItem('todos', JSON.stringify(slicedTodos)); 
    displayTodos(slicedTodos);
}




























// let file = "https://jsonplaceholder.typicode.com/todos"
// let slicedTodos = [];

// document.addEventListener('DOMContentLoaded', function () {
//     fetch(file)
//         .then(response => response.json())
//         .then(todos => {
//             slicedTodos = todos.slice(0, 10); 
//             console.log(slicedTodos);
//             displayTodos(slicedTodos);
//         })
//         .catch(err => console.log(err))

//     const searchInput = document.getElementById('searchInput');
//     searchInput.addEventListener('input', function () {
//         const searchTerm = this.value.toLowerCase();
//         const filteredTodos = slicedTodos.filter(todo => todo.title.toLowerCase().includes(searchTerm));
//         displayTodos(filteredTodos);
//     });
// });

// function displayTodos(todos) {
//     const todoList = document.getElementById('todoList');
//     todoList.innerHTML = '';

//     todos.forEach(todo => {
//         const listItem = document.createElement('tr');
//         listItem.classList.add('item');
//         listItem.textContent = todo.title;
//         todoList.appendChild(listItem);
//     });
//     console.log(todos);
// }


