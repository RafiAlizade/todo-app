var todoUl = document.querySelector('.todo-ul'), createTodo = document.querySelector('.submit_btn_create'), todonameInput = document.querySelector('.todoName_input'), todocreatForm = document.querySelector('.app-create_form'), removeTodo = document.querySelector('.remove_todo_btn'), appCreate = document.querySelector('.app-create'), removeallTodos = document.querySelector('.remove_lists');
var todoArray = [];
function addNewTodo() {
    var todoName = todonameInput.value;
    var HTMLCode = "\n    <li class=\"todo-list\">\n    <span class=\"todo-span\">".concat(todoName, "</span>\n    <a href=\"#\" class=\"remove_todo_btn\">\n    <i class=\"bi bi-x-lg\"></i>\n    </a>\n     </li>");
    todoUl.insertAdjacentHTML('beforeend', HTMLCode);
    addStorage(todoName, true);
}
;
function addStorage(todoText, status) {
    todoArray.push({
        todoName: todoText,
        todoStatus: status
    });
    localStorage.setItem('todo', JSON.stringify(todoArray));
}
;
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
    }
    else {
        alert('Please enter todo name!');
    }
});
todoUl.addEventListener('click', function (e) {
    var _a;
    var target = e.target;
    if (target.closest('.remove_todo_btn')) {
        (_a = target.closest('.todo-list')) === null || _a === void 0 ? void 0 : _a.remove();
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
        showAlert('success', "All todos deleted successfully");
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
