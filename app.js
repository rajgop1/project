// selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filter = document.querySelector("#select")

todoList.addEventListener("click", delfunc)
filter.addEventListener("input",filterfunc)

document.addEventListener("DOMContentLoaded",getLocalTodos)
//Event Listener

todoButton.addEventListener("click",()=>{
    
    // If invalid input function will not store or display    
    if(!(todoInput.value==""))
    {
        // Creating Elements

        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todoDiv")
        todoDiv.classList.add("Uncompleted")
        const todoText = document.createElement("span")
        todoText.innerText = todoInput.value
        saveLocalTodos(todoInput.value)
        todoText.classList.add("todoText")
        const todoCompleted = document.createElement("button") 
        todoCompleted.classList.add("todoCompleted")
        todoCompleted.innerHTML = '<i class="fa-solid fa-square-check"></i>'
        const todoTrash = document.createElement("button") 
        todoTrash.classList.add("todoTrash")
        todoTrash.innerHTML='<i class="fas fa-trash"></i>'
        // Adding Elements
        todoDiv.append(todoText)
        todoDiv.append(todoCompleted)
        todoDiv.append(todoTrash)
        todoList.append(todoDiv)
    }

})

function delfunc(e)
{
    const item = e.target
    console.log(item.classList[0])
    
    if(item.classList[0]==='todoTrash'){
        const todo = item.parentElement
        
        console.log("Clicked on Deleted")
        todo.classList.add("fall")

        todo.addEventListener("transitionend", ()=>{
          todo.remove()  
        })
        
        let todos
        if(localStorage.getItem("todos")==null)
        {
            todos=[]
        }
        else{
            todos=JSON.parse(localStorage.getItem("todos"))
        }
        todoIndex = todo.children[0].innerText
        todos.splice(todos.indexOf(todoIndex),1)
        localStorage.setItem("todos",JSON.stringify(todos))
        
        
    }
    if(item.classList[0]==='todoCompleted')
    {
        
        const todo=item.parentElement
        console.log(e)
        console.log(localStorage.getItem("todos"))
        todo.classList.toggle("strikeit")
        todo.classList.toggle("Uncompleted")
    }
    
}

function filterfunc(e)
{

    const todos = todoList.childNodes
    console.log(todos)

    todos.forEach(todo => {
    console.log(todo)
    console.log(e.target.value)
    switch(e.target.value)
    {
    
        case "All":
            todo.style.display="flex"
            break
        case "Completed":
            if(todo.classList.contains('strikeit'))
            {
                todo.style.display="flex"
            }
            else{
                todo.style.display="none"
            }
            break
        case "Uncompleted":
            if(todo.classList.contains('Uncompleted'))
            {
                todo.style.display="flex"
            }
            else{
                todo.style.display="none"
            }
            break
    }    
    });
    
}

function saveLocalTodos(todo)
{
    let todos
    if(localStorage.getItem("todos")==null)
    {
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
    console.log(todos)
}
function getLocalTodos()
{
    let todos
    if(localStorage.getItem("todos")==null)
    {
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    console.log(todos)
    todos.forEach((todo)=>{
        console.log(todo)
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todoDiv")
        todoDiv.classList.add("Uncompleted")
        const todoText = document.createElement("span")
        todoText.innerText = todo
        todoText.classList.add("todoText")
        const todoCompleted = document.createElement("button") 
        todoCompleted.classList.add("todoCompleted")
        todoCompleted.innerHTML = '<i class="fa-solid fa-square-check"></i>'
        const todoTrash = document.createElement("button") 
        todoTrash.classList.add("todoTrash")
        todoTrash.innerHTML='<i class="fas fa-trash"></i>'
        // Adding Elements
        todoDiv.append(todoText)
        todoDiv.append(todoCompleted)
        todoDiv.append(todoTrash)
        todoList.append(todoDiv)
    })

    

}