import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { DateTime } from 'luxon';

function getMinTime() {
  return DateTime.now().plus({ minutes: 1 }).toISO().split(':').slice(0, 2).join(':');
}

function DatePicker({ required, onTimeAccepted = () => {} }) {
  const [dateVal, setDateVal] = useState('');
  const [validated, setValidated] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      onTimeAccepted(dateVal);
      setHasError(false);
    } else {
      setHasError(true);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Label htmlFor="addNotifcationReminder">Choose a reminder time:</Form.Label>
      <InputGroup>
        <Form.Control
          required={required}
          type="datetime-local"
          id="addNotifcationReminder"
          name="notifcationReminder"
          value={dateVal}
          min={getMinTime()}
          onChange={(e) => {
            if (validated) setValidated(false);
            setDateVal(e.currentTarget.value);
          }}
        />

        <Button variant="primary" type="submit">
          <i className="bi bi-plus-lg" />
          <span className="visually-hidden">add reminder</span>
        </Button>
      </InputGroup>
      <Form.Text className="text-muted">You will get a notification</Form.Text>

      <Form.Control.Feedback type="invalid" style={{ display: hasError ? 'block' : 'none' }}>
        {!dateVal ? 'Must not be empty' : 'Time must be in the future'}
      </Form.Control.Feedback>
    </Form>
  );
}

export default DatePicker;
