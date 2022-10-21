import Comic from './components/comic';
import {useState, useEffect} from "react"
import "./App.css"

function App() {

  const [comicData, setComicData] = useState()
  const [comicNumber, setComicNumber] = useState(1)

    useEffect(() => {
        fetch(`/api/xkcd/${comicNumber}`).then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                setComicData(data)
            }
        )
    }, [comicNumber])


  function decrComicNumber() {
    setComicNumber((prevComicNumber) => prevComicNumber-1)
  }

  function incrComicNumber() {
    setComicNumber((prevComicNumber) => prevComicNumber+1)
  }


  return (
    <div className="App">
      <h1>XKCD Comic Strips</h1>
      <button onClick={decrComicNumber}>Previous</button>
      <button onClick={incrComicNumber}>Next</button>
      {comicData && 
        <Comic 
          img={comicData.img}
          transcript={comicData.transcript}
          year={comicData.year}
          month={comicData.month}
          day={comicData.day}
        />
      }
    </div>
  );
}

export default App;
