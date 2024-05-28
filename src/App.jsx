import { useState } from 'react'
import React from 'react'
import Keyboard from './Keyboard.jsx'
import TextBox from './TextBox.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [data, setData] = useState([]);

  return (
    <React.StrictMode>
      <TextBox data={data}/>

      <Keyboard setData={setData}/>

  </React.StrictMode>
  )
}

export default App
