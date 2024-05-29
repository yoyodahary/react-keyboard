import React from 'react';
import '../styles/Keyboard.css';

function Row({isUpper,keys}) {

    const specialKeys = ['CapsLock', 'Backspace', 'Space']
    const colors = ['Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 'White']

    const unchangableKeys = [specialKeys, colors]

    const processKey = (key) => {
        for (let i = 0; i < unchangableKeys.length; i++) {
            if (unchangableKeys[i].includes(key)) {
                return key
            }
        }
        return isUpper ? key.toUpperCase() : key.toLowerCase()
    }
    return keys.map((key) => {
        return <div className="key"
                style={{ 
                    fontFamily: 'Courier New', 
                }}
            >
            {processKey(key)}
        </div>
    })
}
export default Row;