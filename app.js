// DEFINE UI VARIABLE
const form=document.querySelector('#task-form')
const taskList=document.querySelector('.collection')
const clearBtn=document.querySelector('.clear-tasks')
//const filter=document.querySelector('#filer')
const taskInput=document.querySelector('#task')
let filterInput=document.getElementById('filter')
filterInput.addEventListener('keyup',filterTask)
// LOAD ALL EVENT LISTENER

loadEventListners()
function loadEventListners(){
    document.addEventListener('DOMContentLoaded',getTasks)
    form.addEventListener('submit',addTask)
    taskList.addEventListener('click',removeTask)
    clearBtn.addEventListener('click',clearTask)
   // filter.addEventListener('keyup',filterTask)
}
function getTasks(){
    let tasks
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
        const li=document.createElement('li')
        li.className='collection-item'
        li.appendChild(document.createTextNode(task))
        const link=document.createElement('a')
        link.className='delete-item secondary-content'
        link.innerHTML='<i class="fa fa-remove"></i>'
        li.appendChild(link)
        taskList.appendChild(li)
        })
}
function addTask(e){
    if(taskInput.value===''){
        alert('ADD A TASK')
    }
    // create li element
    const li=document.createElement('li')
    // ADD class
    li.className='collection-item'
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // Create new link
    const link=document.createElement('a')
    link.className='delete-item secondary-content'
    link.innerHTML='<i class="fa fa-remove"></i>'
    li.appendChild(link)
    taskList.appendChild(li)
    // STORE IN LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value)
    taskInput.value=""
    e.preventDefault()
}
function storeTaskInLocalStorage(task){
    let tasks
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove()
            // REMOVE FROM THE LOCAL STORAGE
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
        
    }
}
function removeTaskFromLocalStorage(taskItem,index){
    let tasks
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
        if(taskItem.textContent===task){
            tasks.splice(index,1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
function clearTask(){
    //taskList.innerHTML="" // ONE WAY
    //FASTER WAY TO CLEAR
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
    clearTaskFromLocalStorage()
}
function clearTaskFromLocalStorage(){
    localStorage.clear()
}
function filterTask(e){
    const text=e.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block'
        }else{
            task.style.display="none"
        }
    })
    
}