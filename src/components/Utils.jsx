import classNames from 'classnames';

export const Icon = ({ name }) => <i className={`bi bi-${name}`} />;

export const VisuallyHidden = ({ children, as: El = 'span', className, ...props }) => {
  return (
    <El {...props} className={classNames(className, 'visually-hidden')}>
      {children}
    </El>
  );
};
