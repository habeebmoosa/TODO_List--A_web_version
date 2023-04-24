const todoContainer = document.querySelector('#todoContainer')
const addTodo = document.querySelector('#addTodo')
const saveTodo = document.querySelector('.saveTodo');
const empty_heading = document.querySelector("#empty_heading")

addTodo.addEventListener(
    'click',
    function () {

        addTodoElement()
    }
)

const saveTodoElement = () => {
    const todos = document.querySelectorAll('.todo input');
    const data = []
    todos.forEach(
        (todo) => {
            if (todo.value === "") return
            data.push(todo.value)
        }
    )

    if (data.length === 0) {
        localStorage.removeItem("todos")
    } else {
        localStorage.setItem("todos", JSON.stringify(data))

    }

}

const addTodoElement = (text = "", check) => {

    empty_heading.style.display = "none"

    const todo = document.createElement("div");
    todo.classList.add("todo")

    todo.innerHTML = `
    
    <input id="textInput" type="text" value="${text}" class="inputText" disabled>
    <div class="iElement">
    <i id="selectSaveTodo" class="fa-solid fa-floppy-disk saveTodo"></i>
    <i id="selectEditTodo" class="fa-solid fa-pen-to-square editTodo"></i>
    <i class="fa-solid fa-square-xmark deleteTodo"></i>
    </div>
    
    `
    todo.querySelector('input').disabled = check
    if (check) {
        todo.querySelector("#selectSaveTodo").style.display = "none"
        todo.querySelector("#selectEditTodo").style.display = "block"
    }

    todo.querySelector("input").addEventListener(
        "keyup",
        function (event) {
            if (event.key == "Enter") {
                if (todo.querySelector('input').value === "") {
                    todo.remove()
                }
                todo.querySelector('input').disabled = true
                todo.querySelector("#selectSaveTodo").style.display = "none"
                todo.querySelector("#selectEditTodo").style.display = "block"
                saveTodoElement()
            }
        }
    )

    todo.querySelector(".saveTodo").addEventListener(
        "click",
        function () {
            if (todo.querySelector('input').value === "") {
                todo.remove()
            }
            todo.querySelector('input').disabled = true
            todo.querySelector("#selectSaveTodo").style.display = "none"
            todo.querySelector("#selectEditTodo").style.display = "block"
            saveTodoElement()
        }
    )

    todo.querySelector(".deleteTodo").addEventListener(
        "click",
        function () {
            todo.remove()
            saveTodoElement()
        }
    )

    todo.querySelector(".editTodo").addEventListener(
        "click",
        function () {
            todo.querySelector('input').disabled = false
            todo.querySelector("#selectSaveTodo").style.display = "block"
            todo.querySelector("#selectEditTodo").style.display = "none"
            saveTodoElement()
        }
    )

    todoContainer.appendChild(todo)
    saveTodoElement()

}


(
    function () {

        const listOfTodos = JSON.parse(localStorage.getItem("todos"));

        if (listOfTodos === null) {
            empty_heading.style.display = "block"
        } else {
            empty_heading.style.display = "none"
            listOfTodos.forEach(
                (Todo) => {

                    // console.log(temp)
                    addTodoElement(Todo, true)
                }
            )
        }
    }
)()



