import PropTypes from 'prop-types';

const Notification = ({ message, error }) => {
  if (message === '') {
    return null;
  }

  return <div className={error ? 'error' : 'success'}>{message}</div>;
};

Notification.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
