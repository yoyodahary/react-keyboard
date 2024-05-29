import { useState } from 'react'
import React from 'react'
import Keyboard from './Keyboard.jsx'
import TextBox from './TextBox.jsx'
import '../styles/App.css'

function App() {

  const [data, setData] = useState([]);

  return (
    <React.StrictMode>
      <TextBox data={data}/>

      <Keyboard setData={setData} data={data}/>

  </React.StrictMode>
  )
}

export default App
