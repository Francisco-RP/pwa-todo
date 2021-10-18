import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { DateTime } from 'luxon';

function getMinTime() {
  return DateTime.now().plus({ minutes: 1 }).toISO().split(':').slice(0, 2).join(':');
}

function DatePicker({ required, onTimeAccepted = () => {} }) {
  const [dateVal, setDateVal] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      onTimeAccepted(dateVal);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Group>
          <Form.Label htmlFor="meeting-time">Choose a reminder time:</Form.Label>

          <Form.Control
            required={required}
            type="datetime-local"
            id="reminder-time"
            name="reminder-time"
            value={dateVal}
            min={getMinTime()}
            onChange={(e) => {
              if (validated) setValidated(false);
              setDateVal(e.currentTarget.value);
            }}
          />
          <Form.Text className="text-muted">You will get a notification</Form.Text>
          <Form.Control.Feedback type="invalid">
            {!dateVal ? 'Must not be empty' : 'Time must be in the future'}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="outline-primary" type="submit">
          <i className="bi bi-plus" />
          <span className="visually-hidden">add reminder</span>
        </Button>
      </InputGroup>
    </Form>
  );
}

export default DatePicker;
