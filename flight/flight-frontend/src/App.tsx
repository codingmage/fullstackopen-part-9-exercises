import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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

        <div></div>
        <div></div>
        <div></div>
      </div>




    </div>

  )
}

export default App
