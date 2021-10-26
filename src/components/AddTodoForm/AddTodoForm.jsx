import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { addTodo } from 'features/Todo/todoSlice';
import { Icon, VisuallyHidden } from 'components/Utils';

function AddTodoForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [hasError, setHasError] = useState(false);

  function handleChange(event) {
    const { value } = event.currentTarget;
    if (value.length > 150) {
      event.preventDefault();
      setHasError(true);
      return;
    }

    setHasError(false);
    setTitle(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addTodo(title));
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          onChange={handleChange}
          value={title}
          aria-label="Enter todo item"
          aria-describedby="basic-addon2"
        />
        <Button type="submit" variant="outline-primary" id="button-addon2">
          <Icon name="plus-lg" />
          <VisuallyHidden>add todo</VisuallyHidden>
        </Button>
      </InputGroup>
      <Form.Control.Feedback type="invalid" style={{ display: hasError ? 'block' : 'none' }}>
        Max 150 characters
      </Form.Control.Feedback>
    </form>
  );
}

export default AddTodoForm;
