import { createSlice } from '@reduxjs/toolkit';
import { createTodo, modifyTodo, createReminder, TODO_STATUS } from 'features/Todo/TodoModel';

const initialState = {
  items: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push(createTodo(action.payload));
    },

    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.items.find((item) => id === item.id);
      if (todo) {
        modifyTodo(todo, { title });
      }
    },

    removeTodo: (state, action) => {
      const { payload: id } = action;
      const index = state.items.findIndex((todo) => todo.id === id);
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },

    completeTodo: (state, action) => {
      const { payload: id } = action;
      const todo = state.items.find((item) => id === item.id);
      if (todo) {
        modifyTodo(todo, { status: TODO_STATUS.DONE });
      }
    },

    openTodo: (state, action) => {
      const { payload: id } = action;
      const todo = state.items.find((item) => id === item.id);
      if (todo) {
        modifyTodo(todo, { status: TODO_STATUS.OPEN });
      }
    },

    reorder: (state, action) => {
      const { id, endIndex } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === id);
      if (index >= 0) {
        const [removed] = state.items.splice(index, 1);
        state.items.splice(endIndex, 0, removed);
      }
    },

    addReminder: (state, action) => {
      const { id, tag, timestamp } = action.payload;
      const todo = state.items.find((item) => id === item.id);
      todo.reminders = todo.reminders || [];
      if (todo) {
        todo.reminders.push(createReminder(tag, timestamp));
      }
    },

    removeReminder: (state, action) => {
      const { id, tag } = action.payload;
      const todo = state.items.find((item) => id === item.id);
      if (todo) {
        const index = todo.reminders.findIndex((todo) => todo.tag === tag);
        if (index >= 0) {
          todo.reminders.splice(index, 1);
        }
      }
    },

    clearPastReminders: (state) => {
      state.items.forEach((item) => {
        if (item.reminders.length > 0) {
          item.reminders = item.reminders.filter(({ timestamp }) => {
            return timestamp > Date.now();
          });
        }
      });
    },
  },
});

export const {
  addTodo,
  updateTodo,
  removeTodo,
  completeTodo,
  openTodo,
  reorder,
  addReminder,
  removeReminder,
  clearPastReminders
} = todoSlice.actions;

export const selectTodos = (state) => state.todos.present.items;

export default todoSlice.reducer;
