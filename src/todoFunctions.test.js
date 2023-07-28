const { addTask, deleteTask } = require('./todoFunctions.js');

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
});
