import React from 'react';

const OptionsList = ({ value, onChange, options }) => {
    return (
        <select value={value} onChange={onChange} className="options-link">
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default OptionsList;