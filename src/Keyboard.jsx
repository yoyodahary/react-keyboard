import React from 'react';
import { useState } from 'react'
import './Keyboard.css';
import './Options.jsx';
import Row from './Row.jsx'
import Options from './Options.jsx';
import { SlActionUndo } from "react-icons/sl";



function Keyboard({setData}) {

  const colors = ['Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 'White']
  const fonts = ['Arial', 'Times New Roman', 'Courier New']
  const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px']

  const [font, setFont] = useState('Courier New')
  const [color, setColor] = useState('Black')
  const [isUpperCase, setIsUpperCase] = useState(false)
  const [lang, setLanguage] = useState('English')
  const [fontSize, setFontSize] = useState('20px')
  const [isGlobal, setIsGlobal] = useState(false);
  const [history, setHistory] = useState([]);

    

  const languagesKeys = {
    English: [
      [..."`1234567890-="],
      [..."qwertyuiop[]\\"],
      [..."asdfghjkl;'"],
      ["CapsLock", ..."zxcvbnm,./", "Backspace"],
      ["Space"]
    ]
    ,
    Russian: [
      [..."ё1234567890-="],
      [..."йцукенгшщзхъ"],
      [..."фывапролджэ"],
      ["CapsLock", ..."ячсмитьбю.", "Backspace"],
      ["Space"]
    ]
    ,
    Hebrew: [
      [..."1234567890-="],
      [..."/'קראטוןםפ[]\\"],
      [..."שדגכעיחלך;'"],
      ["CapsLock", ..."זסבהנמצתץ,./", "Backspace"],
      ["Space"]
    ]
  }

  const languages = ["English", "Russian", "Hebrew"]

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)

  }

  const handleColorChange = (event) => {
    setColor(event.target.value)
    if (isGlobal) {
      setData(prevState => ([...prevState.map((item) => {
        return { letter: item.letter, color: event.target.value, font: item.font, fontSize: item.fontSize }
      })]));
    }
  }

  const handleFontChange = (event) => {
    setFont(event.target.value)
    if (isGlobal) {
      setData(prevState => ([...prevState.map((item) => {
        return { letter: item.letter, color: item.color, font: event.target.value, fontSize: item.fontSize }
      })]));
    }
  }

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value)
    if (isGlobal) {
      setData(prevState => ([...prevState.map((item) => {
        return { letter: item.letter, color: item.color, font: item.font, fontSize: event.target.value }
      })]));
    }
  }

  const handleGlobalChange = (event) => {
    setIsGlobal(event.target.checked);
  }  

  const handleUndo = () => {
    // go over the history and remove the last key
    if (history.length > 0) {
      console.log("The history is", history)
      let lastKey = history[history.length - 1];
      let prevKey = history[history.length - 2];
      if (lastKey === 'Backspace') {
        setData(prevState => ([...prevState, prevKey]));
      }
      else {
        setData(prevState => ([...prevState.slice(0, -1)]));
      }
      setHistory(prevState => ([...prevState.slice(0, -1)]));
    }
  }

  

  const handleStateChange = (key) => {
    console.log("The key is", key)
    if (key === 'CapsLock') {
      setIsUpperCase(!isUpperCase);
      return true;
    }
    if (colors.includes(key)) {
      setColor(key);
      return true;

    }
    if (fonts.includes(key)) {
      setFont(key);
      return true;
    }
    setHistory(prevState => ([...prevState, key]));
    return false;

  }


  const handleKeyPress = (event) => {

    console.log("In handleKeyPress", event.target.innerText)


    let space = { letter: ' ', color: color, font: font }
    let enter = { letter: '\n', color: color, font: font }

    if (event.target.classList.contains('key')) {
      const key = event.target.innerText;
      if (key === 'Backspace') {
        setData(prevState => ([...prevState.slice(0, -1)]));
        setHistory(prevState => ([...prevState, key]));
      }  
      else if (key === 'CapsLock') {
        setIsUpperCase(!isUpperCase);
        // make the keybord upper case
        
      } 
      else {
        let b = handleStateChange(key);
        if (!b) {
          let letter = key;
          if (key === 'Space') {
            letter = ' ';
          }
          if (isUpperCase) {
            letter = letter.toUpperCase();
          }
          let newKey = { letter: letter, color: color, font: font,fontSize: fontSize}
          setData(prevState => ([ ...prevState, newKey ]));
          setHistory(prevState => ([...prevState, newKey]));


        }
      }
    }
  }

  const optionsLists = [
    [languages, lang, handleLanguageChange, "Language"],
    [colors, color, handleColorChange, "Color"],
    [fonts, font, handleFontChange, "Font"],
    [fontSizes, fontSize, handleFontSizeChange, "Font Size"]
  
  ]


  const rows = languagesKeys[lang].map((row) => {
      return <div className="keyboard-row">
          <Row isUpper = {isUpperCase} keys={row}/>
      </div>
  })
  
  return (
    <div className="keyboard-container">
      <div className = "keyboard-rows" onClick={handleKeyPress}>
          {rows}
      </div>
      <div className = "special-keys">
        <div className = "keyboard-options">
          <Options optionsLists={optionsLists}/>
        </div>
        < div className='undo-button'>
          <button onClick={handleUndo}>
            <SlActionUndo size="24" />
          </button>
        </div>
        <div className = "general-keys">
          <label>
            <input
                type="checkbox"
                checked={isGlobal}
                onChange={handleGlobalChange}
            />
            Apply changes globally
          </label>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;