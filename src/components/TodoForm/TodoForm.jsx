import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormControl, Button, InputGroup } from 'react-bootstrap';
import { addTodo } from 'features/Todo/todoSlice';
import styles from 'components/TodoForm/TodoForm.module.css';

function TodoForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addTodo(title));
    setTitle('');
  }

  return (
    <div className={styles.formWrap}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputGroup>
          <FormControl
            onChange={handleChange}
            value={title}
            aria-label="Enter todo item"
            aria-describedby="basic-addon2"
          />
          <Button type="submit" variant="outline-primary" id="button-addon2">
            <i className="bi bi-plus" />
          </Button>
        </InputGroup>
      </form>
    </div>
  );
}

export default TodoForm;
