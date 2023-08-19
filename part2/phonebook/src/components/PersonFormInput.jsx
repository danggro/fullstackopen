const PersonFormInput = ({ text, value, handleChange }) => {
  return (
    <div>
      {text}: <input value={value} onChange={handleChange} />
    </div>
  );
};

export default PersonFormInput;
