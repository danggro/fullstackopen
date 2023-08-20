import axios from 'axios';
import { useEffect, useState } from 'react';

const Result = ({ search, countries, handleClick }) => {
  const [weather, setWeather] = useState(null);

  const filterCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (filterCountries.length === 1) {
      const country = filterCountries[0];
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            country.capitalInfo.latlng[0]
          }&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${
            import.meta.env.VITE_SOME_KEY
          }`,
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [search]);

  if (!search) {
    return null;
  }

  if (filterCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filterCountries.length === 1) {
    const country = filterCountries[0];
    if (!weather) return null;
    return (
      <>
        <h2>{country.name.common}</h2>
        <div>
          <p>capital {country.capital.join(', ')}</p>
          <p>area {country.area}</p>
        </div>
        <div>
          <h4>languages:</h4>
          <ul>
            {Object.keys(country.languages).map((l) => (
              <li key={l}>{country.languages[l]}</li>
            ))}
          </ul>
        </div>
        <img src={country.flags.png} alt={country.flags.alt} />
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>temperature {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="iconWeather"
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      </>
    );
  }

  return (
    <>
      {filterCountries.map((c) => (
        <p key={c.name.common}>
          {c.name.common}
          <button onClick={() => handleClick(c.name.common)}>show</button>
        </p>
      ))}
    </>
  );
};

export default Result;
