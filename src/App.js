import Comic from './components/comic';
import {useState, useEffect} from "react"
import "./App.css"

export default function App() {

  // Use end of URL to navigate to a specific comic strip
  let defaultComicNumber
  console.log("comicNumber: ", comicNumber)
  if (typeof comicNumber === "undefined"){
    console.log("document.URL: ", document.URL)
    const comicIdStart = document.URL.lastIndexOf('/')

    console.log("comicIdStart: ", comicIdStart)
    const urlEnd = document.URL.slice(comicIdStart).replace('/','')

    console.log("urlEnd: ", urlEnd)
    
    if (!isNaN(+urlEnd)) { 
      defaultComicNumber = +urlEnd
    } else {
      defaultComicNumber = 1  // TODO: set to max comic number
    }
    console.log('defaultComicNumber: ', defaultComicNumber)
  }

  // comicNumber is the only state that we need to change to change the comic strip.
  // The comicData state is automatically changed when change comicNumber, through useEffect calls.
  const [comicData, setComicData] = useState()
  const [comicNumber, setComicNumber] = useState(defaultComicNumber)

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

  function randomizeComicNumber() {
    fetch("/api/xkcd/").then(
        response => {
          return response.json()
        }
    ).then(
        data => {
          setComicData(data)
        }
    )
  }

  function getMaxComicId() {
    
  }


  return (
    <div className="App">
      <h1>XKCD Comic Strips</h1>
      <button onClick={decrComicNumber}>Previous</button>
      <button onClick={randomizeComicNumber}>Random</button>
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