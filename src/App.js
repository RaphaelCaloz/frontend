import './App.css';
import {useState, useEffect} from "react"

function App() {
  const [appData, setAppData] = useState()

  useEffect(() => {

    fetch("/api/xkcd/1").then(
      response => {
        return response.json()
      }
    ).then(
      data => {
        setAppData(data)
      }
    )

    // fetch("/xkcd/info.0.json").then(response => 
    //   response.json().then(data => ({
    //       data: data,
    //       status: response.status
    //   })
    // ).then(res => {
    //     setAppData(res.data)
    //     console.log(res.data.img)
    //     console.log(res.status, res.data.title)
    // }));
    
  }, [])

  return (
    <div className="App">
      <img src={appData ? appData.img: "" } alt="comic strip"></img>
      <h1>hi</h1>
    </div>
  );
}

export default App;
