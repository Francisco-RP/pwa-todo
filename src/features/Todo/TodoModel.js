import { v4 as uuid } from 'uuid';

export const TODO_STATUS = {
  OPEN: 'open',
  DONE: 'done',
};

export function createTodo(title) {
  return {
    id: uuid(),
    title,
    status: TODO_STATUS.OPEN,
    created: new Date().toISOString(),
    modified: undefined,
  };
}

export function modifyTodo(todo, properties) {
  Object.keys(properties).forEach((key) => {
    todo[key] = properties[key];
  });
  todo.modified = new Date().toISOString();
}
