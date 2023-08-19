import PersonFormInput from './PersonFormInput';

const PersonForm = ({
  newName,
  newNumber,
  handleChangeName,
  handleChangeNumber,
  handleClick,
}) => {
  return (
    <form>
      <PersonFormInput
        text={'name'}
        value={newName}
        handleChange={handleChangeName}
      />
      <PersonFormInput
        text={'number'}
        value={newNumber}
        handleChange={handleChangeNumber}
      />
      <div>
        <button onClick={handleClick} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
