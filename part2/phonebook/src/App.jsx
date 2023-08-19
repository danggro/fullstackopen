import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [styleMessage, setStyleMessage] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const index = persons.findIndex((person) => person.name === newName);
    const confirm = `${newName} is already added to phonebook, replace the old number with a new one?`;
    if (index !== -1 && window.confirm(confirm)) {
      return handleChangeNumber(index);
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      const msgNotif = `Added ${newName}`;
      handleNotification(msgNotif, 'success');
      setMessage(`Added ${newName}`);
      setStyleMessage('success');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setNewName('');
      setNewNumber('');
    });
  };

  const handleDelete = (id) => {
    const namePerson = persons.find((person) => person.id === id).name;
    if (window.confirm(`Delete ${namePerson} ?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        const msgNotif = `Deleted ${namePerson}`;
        handleNotification(msgNotif, 'success');
      });
    }
  };

  const handleChangeNumber = (index) => {
    const changedNumber = { ...persons[index], number: newNumber };
    personService
      .update(persons[index].id, changedNumber)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== persons[index].id ? person : returnedPerson,
          ),
        );
        const msgNotif = `Change number ${newName}`;
        handleNotification(msgNotif, 'success');
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        const msgNotif = `Information of ${newName} has already been removed from server`;
        handleNotification(msgNotif, 'error');
        setPersons(persons.filter((person) => person.id !== persons[index].id));
      });
  };

  const handleNotification = (msgNotif, style) => {
    setMessage(msgNotif);
    setStyleMessage(style);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className={styleMessage} message={message} />
      <Filter
        value={filter}
        handleChange={(event) => setFilter(event.target.value)}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={(event) => setNewName(event.target.value)}
        handleChangeNumber={(event) => setNewNumber(event.target.value)}
        handleClick={addPerson}
      />
      <h2>Numbers</h2>
      <div>
        <Persons
          filter={filter}
          persons={persons}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;

