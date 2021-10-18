import { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash-es';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { removeTodo, completeTodo, openTodo, updateTodo } from 'features/Todo/todoSlice';
import { TODO_STATUS } from 'features/Todo/TodoModel';
import './TodoItem.css';

const { DONE } = TODO_STATUS;

function TodoItem({ todo, onDeleteItem = () => {}, ...props }, ref) {
  const { id, title, status } = todo;
  const dispatch = useDispatch();
  const [text, setText] = useState(title);

  const debouncedUpdate = debounce((title) => {
    dispatch(updateTodo({ id, title }));
  }, 500);

  function onChange(e) {
    setText(e.target.value);
    debouncedUpdate(e.target.value);
  }

  return (
    <Row ref={ref} {...props} as="li" className="gx-0">
      <Col xs="auto" className="align-items-center d-flex grip">
        <i className="bi bi-grip-vertical" />
      </Col>
      <Col xs="auto">
        <Form.Check className="todo-form-check" id={`todo-checkbox-${id}`}>
          <Form.Check.Input
            type="checkbox"
            checked={status === DONE}
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(completeTodo(id));
              } else {
                dispatch(openTodo(id));
              }
            }}
          />
          <Form.Check.Label htmlFor={`todo-checkbox-${id}`} className="visually-hidden">
            Mark done
          </Form.Check.Label>
        </Form.Check>
      </Col>
      <Form.Group as={Col} controlId={`todo-input-${id}`}>
        <Form.Label visuallyHidden>Todo text</Form.Label>
        <Form.Control className="todo-form-control" type="text" value={text} onChange={onChange} />
      </Form.Group>
      <Col xs="auto">
        <Button
          variant="danger"
          onClick={() => {
            dispatch(removeTodo(id));
            onDeleteItem(id);
          }}
        >
          <i className="bi bi-trash" />
        </Button>
      </Col>
    </Row>
  );
}

export default forwardRef(TodoItem);
