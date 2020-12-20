import logo from './logo.svg';
import './App.css';
import Box from './Box'
import { useEffect, useState } from 'react';

function App() {
  let [value, setValue] = useState("longdz")

  const state = useState()
  const vl = state[0]
  const setVl = state[1]

 useEffect(function () {
  fetch('https://apicms.izzi.asia/graphql/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      query: `
      {
        merchant(param:{id:"008d8d6a-14a1-4d17-9b1c-2b8c2f8f5eb3"})
        {
          code,
          configuration,
          createdBy,
          createdDate,
          googleAnalytics,
          themeWebInstalled,
          expiredTime
}
        }
      `
    })
  }).then(function (response) {
    response.json().then((json) => {
      setVl( json.data.merchant.code)
      // setValue(json.data.merchant.code)
    })
  })
 }, [])

  return (
    <div className="App">
      <input onChange={function (event) {
        setValue(event.target.value)
      }}/>
      <button onClick={function (event) {
        alert(value)
      }}>click me</button>
      <div>{vl}</div>
    </div>
  );
}

function myFunction() {
  alert("hii");
}

export default App;
