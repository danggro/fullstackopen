import { Dispatch, SetStateAction, useState } from 'react';
import { addDiary } from '../diariesService';
import { DiaryEntry, Visibility, Weather } from '../types';
import axios, { AxiosError } from 'axios';

interface DiaryFormProps {
  diaries: DiaryEntry[];
  setDiaries: Dispatch<SetStateAction<DiaryEntry[]>>;
}

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      date: { value: string };
      visibility: { value: Visibility };
      weather: { value: Weather };
    };
    const date = target.date.value;
    const visibility = target.visibility.value;
    const weather = target.weather.value;
    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    };

    addDiary(newDiary)
      .then((data) => {
        setDiaries(diaries.concat(data));
        console.log(data);
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError<string>(error) && error.response) {
          setErrorMessage(error.response.data);
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        } else {
          console.error(error);
        }
      });
  };
  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>date</label>
          <input type="date" name="date" />
        </div>
        <div>
          visibility <label>great</label>
          <input type="radio" name="visibility" value="great" defaultChecked />
          <label>good</label>
          <input type="radio" name="visibility" value="good" />
          <label>ok</label>
          <input type="radio" name="visibility" value="ok" />
          <label>poor</label>
          <input type="radio" name="visibility" value="poor" />
        </div>
        <div>
          weather <label>sunny</label>
          <input type="radio" name="weather" value="sunny" defaultChecked />
          <label>rainy</label>
          <input type="radio" name="weather" value="rainy" />
          <label>cloudy</label>
          <input type="radio" name="weather" value="cloudy" />
          <label>stormy</label>
          <input type="radio" name="weather" value="stormy" />
          <label>windy</label>
          <input type="radio" name="weather" value="windy" />
        </div>
        <div>
          <label>comment</label>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            name="comment"
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default DiaryForm;
