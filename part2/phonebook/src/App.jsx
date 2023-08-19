import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);
  const addPerson = (event) => {
    event.preventDefault();
    const index = persons.findIndex((person) => person.name === newName);
    if (index !== -1) return alert(`${newName} is already added to phonebook`);

    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }),
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
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

      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;

