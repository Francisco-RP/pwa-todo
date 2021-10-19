import { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash-es';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { removeTodo, completeTodo, openTodo, updateTodo } from 'features/Todo/todoSlice';
import { TODO_STATUS } from 'features/Todo/TodoModel';
import TodoItemSetting from 'components/TodoItemSetting/TodoItemSetting';
import ContentEditable from 'components/ContentEditable';
import styles from 'features/Todo/TodoItem.module.css';

const { DONE, OPEN } = TODO_STATUS;

function TodoItem({ todo, onDeleteItem = () => {}, ...props }, ref) {
  const { id, title, status } = todo;
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedUpdate = debounce((title) => {
    dispatch(updateTodo({ id, title }));
  }, 1000);

  function onChange(e) {
    debouncedUpdate(e.currentTarget.textContent);
  }

  const isDone = status === DONE;

  return (
    <Row
      ref={ref}
      {...props}
      as="li"
      className={classNames('gx-0 mb-1', styles.fadeIn, {
        [styles.fadeOut]: isDeleting,
      })}
    >
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
          <ContentEditable
            onChange={onChange}
            className={classNames(styles.control, 'form-control', {
              'text-muted text-decoration-line-through': isDone,
            })}
            text={title}
          />

          {!isDone && (
            <Button
              variant="link"
              onClick={() => {
                setShowSettings(!showSettings);
              }}
            >
              <i className="bi bi-gear" />
            </Button>
          )}
          <Button
            className={styles.remove}
            variant="link"
            onClick={() => {
              setIsDeleting(true);
              onDeleteItem(id);
              setTimeout(() => {
                dispatch(removeTodo(id));
              }, 500);
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
