import React from 'react';
import './RoundButton.css';

const roundButton = ( props ) => (
    <button className={`ui ${props.color} button Round`} {...props}>
        {props.children}
    </button>
);

export default roundButton;