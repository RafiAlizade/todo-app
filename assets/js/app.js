var todoUl = document.querySelector('.todo-ul'), createTodo = document.querySelector('.submit_btn_create'), todonameInput = document.querySelector('.todoName_input'), todocreatForm = document.querySelector('.app-create_form'), removeTodo = document.querySelector('.remove_todo_btn'), appCreate = document.querySelector('.app-create'), removeallTodos = document.querySelector('.remove_lists');
var todoArray = [];
function addNewTodo() {
    var todoName = todonameInput.value;
    var HTMLCode = "\n    <li class=\"todo-list\" id='".concat(todoName.trim(), "'>\n    <span class=\"todo-span\">").concat(todoName, "</span>\n    <a href=\"#\" class=\"remove_todo_btn\">\n    <i class=\"bi bi-x-lg\"></i>\n    </a>\n     </li>");
    todoUl.insertAdjacentHTML('beforeend', HTMLCode);
    addStorage(todoName);
}
;
function addStorage(todoText) {
    todoArray.push({
        todoName: todoText
    });
    localStorage.setItem('todo', JSON.stringify(todoArray));
}
;
function checkLocalStorage() {
    var todos = JSON.parse(localStorage.getItem('todo') || '[]');
    todoArray = todos;
    return todoArray;
}
function loadStorage() {
    var todos = JSON.parse(localStorage.getItem('todo') || '[]');
    todoArray = todos;
    if (todoArray.length > 0) {
        todoArray.forEach(function (allTodos) {
            var HTMLCode = "\n        <li class=\"todo-list\">\n        <span class=\"todo-span\">".concat(allTodos.todoName, "</span>\n        <a href=\"#\" class=\"remove_todo_btn\">\n        <i class=\"bi bi-x-lg\"></i>\n        </a>\n         </li>");
            todoUl.insertAdjacentHTML('beforeend', HTMLCode);
        });
    }
}
;
loadStorage();
createTodo.addEventListener('click', function (e) {
    e.preventDefault();
    if (todonameInput.value.length > 0) {
        addNewTodo();
        todonameInput.value = '';
        showAlert('success', "You have successfully added a new todo!");
    }
    else {
        alert('Please enter todo name!');
    }
});
todoUl.addEventListener('click', function (e) {
    var target = e.target;
    var todoItem = target.closest('.todo-list');
    var todoDeleteInput = target.closest('.remove_todo_btn');
    if (todoDeleteInput) {
        var todoName_1 = todoItem.querySelector('.todo-span').textContent;
        todoItem.remove();
        todoArray = todoArray.filter(function (todo) { return todo.todoName !== todoName_1; });
        localStorage.setItem('todo', JSON.stringify(todoArray));
        showAlert('success', "You have successfully deleted todos");
    }
});
removeallTodos.addEventListener('click', function () {
    var todos = JSON.parse(localStorage.getItem('todo') || '[]');
    todoArray = todos;
    if (todoArray.length == 0) {
        showAlert('danger', "You say to delete all todos now, but we didn't find any todos.");
    }
    else {
        localStorage.clear();
        showAlert('success', "All todos deleted successfully");
        setInterval(function () {
            location.reload();
        }, 1000);
    }
});
function showAlert(type, message) {
    var div = document.createElement("div");
    div.className = "alert alert-".concat(type); //litirel template
    div.textContent = message;
    appCreate.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, 2500);
}
