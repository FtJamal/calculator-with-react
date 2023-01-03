import React from 'react'

import "./keypad.css";


function Keypad(props) {
    const keys = [
        {
            keyCode: 55,
            label: "7",
        },
        {
            keyCode: 56,
            label: "8",
        },
        {
            keyCode: 57,
            label: "9",
        },
        {
            keyCode: 52,
            label: "4",
        },
        {
            keyCode: 53,
            label: "5",
        },
        {
            keyCode: 54,
            label: "6",
        },
        {
            keyCode: 49,
            label: "1",
        },
        {
            keyCode: 50,
            label: "2",
        },
        {
            keyCode: 51,
            label: "3",
        },
        {
            keyCode: 48,
            label: "0",
        },
        {
            keyCode: 190,
            label: ".",
        },
        {
            keyCode: 187,
            label: "=",
        },

    ]

    const symbols = [
        {
            label: "⌫",
            keyCode: 8,
            value: "backspace",
        },
        {
            label: "÷",
            keyCode: 191,
            value: "/",
        },
        {
            label: "x",
            keyCode: 56,
            value: "*",
        },
        {
            label: "-",
            keyCode: 189,
            value: "-",
        },
        {
            label: "+",
            keyCode: 187,
            value: "+",
        },
    ]
    return (
        <div className='keypad'>
        
            <div className='keypad_keys'>
                {keys.map((item, index) =>
                    <p
                    //calculator k keypad pe click ko handle krne k lye props k through function call kya 
                        // onclick k ander function lga k phr call kare gay
                        onClick={() => props.handleKeyPress(item.keyCode, item.label)}
                        key={index}>
                        {item.label}
                    </p>
                )}
            </div>
            <div className='keypad_symbols'>
                {symbols.map((item, index) =>
                    <p
                        onClick={() => props.handleKeyPress(item.keyCode, item.value)}
                        key={index}>
                        {item.label}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Keypad