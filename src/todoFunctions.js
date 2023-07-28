const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearCompletedBtn = document.getElementById('btn-clear');

let tasks = [];

// Save tasks to local storages
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update remaining task indexes after deletion
function updateTaskIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

// Function to render the tasks
function renderTasks() {
  if (!taskList) return;
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    // eslint-disable-next-line no-use-before-define
    const taskHTML = createTaskHTML(task);
    taskList.appendChild(taskHTML);
  });
}

// Function to update the description of a task in the tasks array
function updateTaskDescription(index, description) {
  const task = tasks.find((task) => task.index === index);
  if (task) {
    task.description = description;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks = tasks.filter((task) => task.index !== index);
  updateTaskIndexes();
  saveTasksToLocalStorage();
  renderTasks();
}

// Function to mark a task as completed
function toggleTaskCompletion(index) {
  const task = tasks.find((task) => task.index === index);
  if (task) {
    task.completed = !task.completed;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Function to toggle editing mode for a task
function toggleTaskEditing(index) {
  const task = tasks.find((task) => task.index === index);
  if (task) {
    task.editing = !task.editing;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Helper function to create task HTML
function createTaskHTML(task) {
  const li = document.createElement('li');
  li.className = `${task.completed ? 'completed' : ''} ${task.editing ? 'editing' : ''}`;
  li.setAttribute('draggable', 'true');
  li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      ${
  task.editing
    ? `<input type="text" value="${task.description}">`
    : `<label>${task.description}</label>`
}
      <div class="task-actions">
        <i class="fas fa-ellipsis-v task-more"></i>
        <i class="fas fa-trash task-delete"></i>
      </div>
      <hr>
    `;

  const checkbox = li.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => toggleTaskCompletion(task.index));

  const taskMore = li.querySelector('.task-more');
  const taskDelete = li.querySelector('.task-delete');

  taskMore.addEventListener('click', () => toggleTaskEditing(task.index));
  taskDelete.addEventListener('click', () => deleteTask(task.index));

  if (task.editing) {
    const taskInput = li.querySelector('input[type="text"]');
    taskInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const description = taskInput.value.trim();
        if (description !== '') {
          updateTaskDescription(task.index, description);
        }
      }
    });
  }
  return li;
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
  if (tasksFromLocalStorage) {
    tasks = tasksFromLocalStorage || [];
  }
  renderTasks();
}

// Function to add a new task
function addTask(description) {
  const newTask = {
    description,
    completed: false,
    editing: false,
    index: tasks.length + 1,
  };

  tasks.push(newTask);
  saveTasksToLocalStorage();
  renderTasks();
}

// Function to clear all completed tasks
function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  updateTaskIndexes();
  saveTasksToLocalStorage();
  renderTasks();
}

function getTask() {
  return tasks;
}

export {
  todoForm,
  taskInput,
  taskList,
  clearCompletedBtn,
  saveTasksToLocalStorage,
  updateTaskIndexes,
  renderTasks,
  updateTaskDescription,
  deleteTask,
  toggleTaskCompletion,
  toggleTaskEditing,
  loadTasksFromLocalStorage,
  addTask,
  clearCompletedTasks,
  getTask,
};
