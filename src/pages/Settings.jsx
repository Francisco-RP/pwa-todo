import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { updateSimpleSetting } from 'redux/settingsSlice';

function SettingsPage() {
  const dispatch = useDispatch();
  const allSettings = useSelector((state) => state.settings);

  function requestPermission() {
    Notification.requestPermission().then((permission) => {
      dispatch(
        updateSimpleSetting({
          settingsKey: 'allowNotification',
          value: permission === 'granted',
        })
      );
    });
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Settings</h1>
        </Col>
      </Row>
      <Row>
        <Col>Allow notifications</Col>
        <Col xs="auto">
          <Form.Check
            type="switch"
            id="allowNotifications"
            label="Toggle Allow Notifications"
            checked={allSettings.allowNotification}
            onChange={(e) => {
              if (e.target.checked) {
                requestPermission();
              } else {
                dispatch(
                  updateSimpleSetting({
                    settingsKey: 'allowNotification',
                    value: false,
                  })
                );
              }
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SettingsPage;
