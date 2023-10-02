import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiary } from './diariesService';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiary().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <p>
            <strong>{diary.date}</strong>
          </p>
          <div>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
