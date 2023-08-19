import Person from './Person';

const Persons = ({ filter, persons }) => {
  return filter
    ? persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        )
        .map((person) => <Person key={person.name} person={person} />)
    : persons.length > 0
    ? persons.map((person) => <Person key={person.name} person={person} />)
    : '...';
};

export default Persons;
