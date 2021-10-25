import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';

const CustomToggle = forwardRef(({ onClick }, ref) => (
  <button
    className="btn-reset"
    type="button"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <span className="visually-hidden">options</span>
    <i className="bi bi-three-dots-vertical" />
  </button>
));

function OverflowMenu({ id, items = [] }) {
  return (
    <Dropdown
      align="end"
      onSelect={(eventKey) => {
        items[parseInt(eventKey, 10)]?.onSelect?.();
      }}
    >
      <Dropdown.Toggle as={CustomToggle} id={id} />

      <Dropdown.Menu>
        {items.map((item, i) => (
          <Dropdown.Item eventKey={i} key={`${item.name}-${i}}`}>
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default OverflowMenu;
