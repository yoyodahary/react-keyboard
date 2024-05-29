// Options.jsx
import React from 'react';
import '../styles/Options.css';
import OptionsList from './OptionsList.jsx';

const Options = ({ optionsLists }) => {
    return (
        <div className="options-container">
            <ul className="options-list">
                {optionsLists.map((optionsList, index) => (
                    <OptionsList 
                        key={index}
                        options={optionsList[0]} 
                        value={optionsList[1]} 
                        onChange={optionsList[2]} 
                        label={optionsList[3]} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default Options;