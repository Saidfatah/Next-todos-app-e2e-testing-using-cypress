import { Todo } from "./types";

// Mocked database
let todos: Todo[] = [
  { id: 1, text: "buy new tires", done: false },
  { id: 2, text: "go swim", done: false },
];

// Fetch todos
export const fetchTodos = async (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(todos);
    }, 1000);
  });
};

// Add a new todo
export const addTodo = async (newTodoText: string): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = Math.max(...todos.map(todo => todo.id)) + 1;
      todos.push({ id, text: newTodoText, done: false });
      resolve(todos);
    }, 1000);
  });
};

// Remove a todo
export const removeTodo = async (id: number): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      todos = todos.filter(todo => todo.id !== id);
      resolve(todos);
    }, 1000);
  });
};

// Update a todo's done status
export const updateTodo = async (id: number): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      todos = todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      resolve(todos);
    }, 1000);
  });
};
