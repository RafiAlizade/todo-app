const todoUl = document.querySelector('.todo-ul') as HTMLUListElement,
    createTodo = document.querySelector('.submit_btn_create') as HTMLButtonElement,
    todonameInput = document.querySelector('.todoName_input') as HTMLInputElement,
    todocreatForm = document.querySelector('.app-create_form') as HTMLFormElement,
    removeTodo = document.querySelector('.remove_todo_btn') as HTMLAnchorElement,
    appCreate = document.querySelector('.app-create') as HTMLDivElement,
    removeallTodos = document.querySelector('.remove_lists') as HTMLAnchorElement;


let todoArray: any[] = [];

function addNewTodo() {
    let todoName = todonameInput.value;

    const HTMLCode = `
    <li class="todo-list">
    <span class="todo-span">${todoName}</span>
    <a href="#" class="remove_todo_btn">
    <i class="bi bi-x-lg"></i>
    </a>
     </li>`

     todoUl.insertAdjacentHTML('beforeend', HTMLCode)

     addStorage(todoName, true)
};

function addStorage(todoText:string, status:boolean) {
    todoArray.push(
        {
        todoName : todoText,
        todoStatus : status
    }
    )

    localStorage.setItem('todo', JSON.stringify(todoArray))
};

function loadStorage() {
    let todos = JSON.parse(localStorage.getItem('todo') || '[]');

    todoArray = todos;

    if(todoArray.length > 0) {
        todoArray.forEach(allTodos => {
            const HTMLCode = `
        <li class="todo-list">
        <span class="todo-span">${allTodos.todoName}</span>
        <a href="#" class="remove_todo_btn">
        <i class="bi bi-x-lg"></i>
        </a>
         </li>`
    
         todoUl.insertAdjacentHTML('beforeend', HTMLCode)
        })
    }
};

loadStorage();

createTodo.addEventListener('click', function(e) {
    e.preventDefault();

    if(todonameInput.value.length > 0) {
        addNewTodo();
    } else {
        alert('Please enter todo name!')
    }
});

todoUl.addEventListener('click', function(e) {
    const target = e.target as HTMLElement;

    if (target.closest('.remove_todo_btn')) {
        target.closest('.todo-list')?.remove();

        showAlert('success', `You have successfully deleted todos`)
    }
});

removeallTodos.addEventListener('click', function() {
    let todos = JSON.parse(localStorage.getItem('todo') || '[]');

    todoArray = todos;

    if (todoArray.length == 0) {
        showAlert('danger', `You say to delete all todos now, but we didn't find any todos.`);
    } else {
        showAlert('success', `All todos deleted successfully`)
    }
})

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`; //litirel template
    div.textContent = message;

    appCreate.appendChild(div);

    setTimeout(function(){
        div.remove();
    },2500);
}