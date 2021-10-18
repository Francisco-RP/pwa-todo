import { createSlice } from '@reduxjs/toolkit';
import { createTodo, modifyTodo, TODO_STATUS } from 'features/Todo/TodoModel';

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
      const todo = state.items.find(item => id === item.id);
      modifyTodo(todo, { title });
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
      const todo = state.items.find(item => id === item.id);
      modifyTodo(todo, { status: TODO_STATUS.DONE });
    },

    openTodo: (state, action) => {
      const { payload: id } = action;
      const todo = state.items.find(item => id === item.id);
      modifyTodo(todo, { status: TODO_STATUS.OPEN });
    },

    reorder: (state, action) => {
      const { id, endIndex } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === id);
      const [removed] = state.items.splice(index, 1);
      state.items.splice(endIndex, 0, removed);
    },
  },
});

export const { addTodo, updateTodo, removeTodo, completeTodo, openTodo, reorder } =
  todoSlice.actions;

export const selectTodos = (state) => state.todos.present.items;

export default todoSlice.reducer;
