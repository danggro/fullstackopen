import Person from './Person';

const Persons = ({ filter, persons, handleDelete }) => {
  const filterPersons = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
      );
  return filterPersons.map((person) => (
    <Person key={person.id} person={person} handleDelete={handleDelete} />
  ));
};

export default Persons;
