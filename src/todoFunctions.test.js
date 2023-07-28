const { addTask, deleteTask, updateTaskDescription,toggleTaskCompletion,clearCompletedTasks, } = require('./todoFunctions.js');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Set the localStorage mock before each test
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  // Initialize the localStorage with an empty 'items' array before each test
  localStorageMock.setItem('items', JSON.stringify([]));
});
// Tests for addTask function
describe('addTask function', () => {
  test('should add an item to the list and update localStorage', () => {
    // Call the addTask function to add a new task
    const newDesc = 'Task 3';
    addTask(newDesc);

    // Retrieve the updated tasks from localStorage
    const updatedTodo = JSON.parse(localStorageMock.getItem('tasks'));

    // Check if the length of the updated tasks array is correct
    expect(updatedTodo.length).toBe(1);

    // Check if the last task in the updated tasks array matches the new task
    expect(updatedTodo[updatedTodo.length - 1]).toEqual({
      description: newDesc,
      completed: false, // Assuming a default value for the added task
      editing: false, // Assuming a default value for the added task
      index: 1, // The index should start from 1
    });
  });
});

// Tests for deleteTask function
describe('deleteTask function', () => {
  test('should remove an item from the list and update localStorage', () => {
    // Initialize localStorage with some initial tasks
    const initialTodo = [
      { description: 'Todo Task 1' },
      { description: 'Todo Task 2' },
      { description: 'Todo Task 3' },
    ];
    localStorageMock.setItem('tasks', JSON.stringify(initialTodo));

    // Call the deleteTask function to remove the task at index 0
    deleteTask(initialTodo[0]);

    // Retrieve the updated tasks from localStorage
    const storedItems = JSON.parse(localStorageMock.getItem('tasks'));

    // Check if the length of the updated tasks array is correct
    const updatedLength = initialTodo.length - 2;
    expect(storedItems.length).toBe(updatedLength);

    // Check if the first task in the updated tasks array is now 'Task 2'
    expect(storedItems[0].description).toBe('Task 3');
  });

  // Mock the HTML elements for DOM manipulation functions
const todoFormMock = document.createElement('form');
const taskInputMock = document.createElement('input');
const taskListMock = document.createElement('ul');
const clearCompletedBtnMock = document.createElement('button');

// Set the mock HTML elements
document.getElementById = jest.fn((id) => {
  switch (id) {
    case 'todo-form':
      return todoFormMock;
    case 'task-input':
      return taskInputMock;
    case 'task-list':
      return taskListMock;
    case 'btn-clear':
      return clearCompletedBtnMock;
    default:
      return null;
  }
});

// Reset the mock elements' innerHTML
todoFormMock.innerHTML = '';
taskListMock.innerHTML = '';
clearCompletedBtnMock.innerHTML = '';
});

// Tests for updateTaskDescription function
describe('updateTaskDescription function', () => {
test('should update the description of a task in the tasks array', () => {
  // Initialize tasks
  const initialTasks = [
    { description: 'todo Task 1', completed: false, editing: false, index: 1 },
    { description: 'todo Task 2', completed: false, editing: false, index: 2 },
  ];
  localStorageMock.setItem('tasks', JSON.stringify(initialTasks));

  // Call the updateTaskDescription function to update the description of task at index 1
  const newDescription = 'Updated Task 1';
  updateTaskDescription(1, newDescription);

  // Retrieve the updated tasks from localStorage
  const updatedTasks = JSON.parse(localStorageMock.getItem('tasks'));

  // Check if the description of task at index 1 is updated
  expect(updatedTasks[0].description).toBe(newDescription);
});
});

// Tests for toggleTaskCompletion function
describe('toggleTaskCompletion function', () => {
test('should toggle the completed status of a task in the tasks array', () => {
  // Initialize tasks
  const initialTasks = [
    { description: 'Task 1', completed: false, editing: false, index: 1 },
    { description: 'Task 2', completed: false, editing: false, index: 2 },
  ];
  localStorageMock.setItem('tasks', JSON.stringify(initialTasks));

  // Call the toggleTaskCompletion function to toggle the completed status of task at index 1
  toggleTaskCompletion(1);

  // Retrieve the updated tasks from localStorage
  const updatedTasks = JSON.parse(localStorageMock.getItem('tasks'));

  // Check if the completed status of task at index 1 is toggled
  expect(updatedTasks[0].completed).toBe(true);
});
});

// Tests for clearCompletedTasks function
describe('clearCompletedTasks function', () => {
test('should remove all completed tasks from the tasks array', () => {
  // Initialize tasks with completed and non-completed tasks
  const initialTasks = [
    { description: 'Task 1', completed: true, editing: false, index: 1 },
    { description: 'Task 2', completed: true, editing: false, index: 2 },
    { description: 'Task 3', completed: true, editing: false, index: 3 },
  ];
  localStorageMock.setItem('tasks', JSON.stringify(initialTasks));

  // Call the clearCompletedTasks function to remove completed tasks
  clearCompletedTasks();

  // Retrieve the updated tasks from localStorage
  const updatedTasks = JSON.parse(localStorageMock.getItem('tasks'));

  // Check if all completed tasks are removed
  expect(updatedTasks.length).toBe(0);
});
});

