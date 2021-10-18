import { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash-es';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { removeTodo, completeTodo, openTodo, updateTodo } from 'features/Todo/todoSlice';
import { TODO_STATUS } from 'features/Todo/TodoModel';
import TodoItemSetting from 'components/TodoItemSetting/TodoItemSetting';
import styles from 'features/Todo/TodoItem.module.css';

const { DONE, OPEN } = TODO_STATUS;

function TodoItem({ todo, onDeleteItem = () => {}, ...props }, ref) {
  const { id, title, status } = todo;
  const dispatch = useDispatch();
  const [text, setText] = useState(title);
  const [showSettings, setShowSettings] = useState(false);

  const debouncedUpdate = debounce((title) => {
    dispatch(updateTodo({ id, title }));
  }, 500);

  function onChange(e) {
    setText(e.target.value);
    debouncedUpdate(e.target.value);
  }

  const isDone = status === DONE;

  return (
    <Row ref={ref} {...props} as="li" className="gx-0 mb-1">
      {status === OPEN && (
        <Col xs="auto" className={`align-items-center d-flex ${styles.grip}`}>
          <i className="bi bi-grip-vertical" />
        </Col>
      )}
      <Col xs="auto">
        <Form.Check className={styles.check} id={`todo-checkbox-${id}`}>
          <Form.Check.Input
            type="checkbox"
            checked={isDone}
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
      <Col>
        <InputGroup>
          <Form.Group controlId={`todo-input-${id}`} className="flex-fill">
            <Form.Label visuallyHidden>Todo text</Form.Label>
            <Form.Control
              disabled={isDone}
              className={classNames(styles.control, {
                'text-muted text-decoration-line-through': isDone,
              })}
              type="text"
              value={text}
              onChange={onChange}
            />
          </Form.Group>
          {!isDone && (
            <Button
              variant="light"
              onClick={() => {
                setShowSettings(!showSettings);
              }}
            >
              <i className="bi bi-gear" />
            </Button>
          )}
          <Button
            className={styles.remove}
            variant="outline-danger"
            onClick={() => {
              dispatch(removeTodo(id));
              onDeleteItem(id);
            }}
          >
            <i className="bi bi-trash" />
          </Button>
        </InputGroup>
      </Col>
      {showSettings && (
        <Col xs={12}>
          <TodoItemSetting todo={todo} />
        </Col>
      )}
    </Row>
  );
}

export default forwardRef(TodoItem);
