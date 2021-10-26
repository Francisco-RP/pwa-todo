import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Icon, VisuallyHidden } from 'components/Utils';

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
    <VisuallyHidden>options</VisuallyHidden>
    <Icon name="three-dots-vertical" />
  </button>
));

function OverflowMenu({ id, items = [] }) {
  return (
    <Dropdown
      align="end"
      onSelect={(eventKey) => {
        items[eventKey]?.onSelect?.();
      }}
    >
      <Dropdown.Toggle as={CustomToggle} id={id} />

      <Dropdown.Menu>
        {items.map((item, i) => (
          <Dropdown.Item eventKey={i} key={`${item.name}-${id}-${i}}`} className="d-flex gap-2 align-items-center">
            {item.icon && <Icon name={item.icon} />}
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default OverflowMenu;
