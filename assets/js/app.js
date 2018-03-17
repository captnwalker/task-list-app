const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

const closest = function(element, targetClass) {
    //go up the dom
    while(element.className !== targetClass) {
      element = element.parentElement;
      if(!element) {
        return null;
      }
    }
    //return element
    return element;
  }

// Load all event listners
loadEventListners();

function loadEventListners() {

    //On DOM load
    document.addEventListener('DOMContentLoaded', getTasks)

    // Add task
    form.addEventListener('submit', addTask);

    // Remove task
    tasklist.addEventListener('click', removeTask);

    // Clear tasks
    clearBtn.addEventListener('click', clearTasks);

    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks fro LS
function getTasks() {
        let tasks;
        if(localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function(task) {
    
    // Create li
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    const link  = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append li
    tasklist.appendChild(li);
    });
}

// Add a task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task')
    }

    // Create li
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link  = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append li
    tasklist.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    const target = e.target;
    if(target.classList.contains("fa-remove")) {
      var closestLi = closest(target, 'collection-item');
      closestLi.remove();
    }
    
    e.preventDefault();
  }

// Clear tasks
function clearTasks() {
    tasklist.innerHTML = '';
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
  
    document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }