import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { updateSetting } from 'redux/settingsSlice';

function SettingsPage() {
  const dispatch = useDispatch();
  const allSettings = useSelector((state) => state.settings);

  function requestPermission() {
    Notification.requestPermission().then((permission) => {
      dispatch(
        updateSetting({
          allowNotification: permission === 'granted',
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
      <Row className="mt-4">
        <Col>Allow notifications</Col>
        <Col xs="auto">
          <Form.Check
            type="switch"
            id="allowNotifications"
            aria-label="Toggle Allow Notifications"
            checked={allSettings.allowNotification}
            onChange={(e) => {
              if (e.target.checked) {
                requestPermission();
              } else {
                dispatch(updateSetting({ allowNotification: false }));
              }
            }}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>Dark Mode</Col>
        <Col xs="auto">
          <fieldset>
            <Form.Check
              inline
              type="radio"
              id="darkMode-on"
              name="darkMode"
              label="on"
              checked={allSettings.darkMode === 'on'}
              value="on"
              onChange={(e) => {
                dispatch(updateSetting({ darkMode: 'on' }));
              }}
            />
            <Form.Check
              inline
              type="radio"
              id="darkMode-off"
              name="darkMode"
              label="off"
              checked={allSettings.darkMode === 'off'}
              value="off"
              onChange={(e) => {
                dispatch(updateSetting({ darkMode: 'off' }));
              }}
            />
            <Form.Check
              inline
              type="radio"
              id="darkMode-system"
              name="darkMode"
              label="OS"
              checked={allSettings.darkMode === 'system'}
              value="system"
              onChange={(e) => {
                dispatch(updateSetting({ darkMode: 'system' }));
              }}
            />
          </fieldset>
        </Col>
      </Row>
    </Container>
  );
}

export default SettingsPage;
