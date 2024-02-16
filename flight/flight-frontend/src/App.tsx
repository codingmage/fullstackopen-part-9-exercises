import { useState } from 'react'
import './App.css'
import { DiaryEntry } from './types'


function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>()

  return (
    <div>
      <div>
        <h3>Add new entries: </h3>
          <form>
            <div> <label>date</label> <input/> </div>
            <div> <label>visibility</label> <input/> </div>
            <div> <label>weather </label> <input/> </div>
            <div> <label>comment</label> <input/> </div>
            <button type='submit'>add</button>
        </form>
      </div>

      <div>
        <h3>Diary Entries</h3>
          {entries ? entries.map((entry) => (
            <div key={entry.id}>
              <h4>{entry.date}</h4>

              <div>visibility: {entry.visibility}</div>
              <div>weather: {entry.weather}</div>
            </div>
          )) : <div>Loading...</div>}
      </div>
    </div>

  )
}

export default App
