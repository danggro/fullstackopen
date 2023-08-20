import { useEffect, useState } from 'react';
import axios from 'axios';
import Result from './components/Result';
const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  if (!countries) {
    return null;
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (name) => {
    setSearch(name);
  };
  return (
    <>
      <div>
        <p>
          find countries <input onChange={handleChange} value={search} />
        </p>
      </div>
      <Result search={search} countries={countries} handleClick={handleClick} />
    </>
  );
};

export default App;

