import React, { useState } from 'react';
import axios from 'axios';
import "./styles.css";

const MultiBaseConverter = () => {
    const [number, setNumber] = useState('');
    const [fromBase, setFromBase] = useState(2);
    const [toBase, setToBase] = useState(10);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleConvert = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/convert', {
                number,
                from_base: fromBase,
                to_base: toBase,
            });
            setResult(response.data.result);
            setError('');
        } catch (err) {
            // Check if error response exists and has data
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                // Fallback error message
                setError('An unexpected error occurred.');
            }
            setResult('');
        }
    };


    return (
        <div className={"App"}>
            <h1>Multi-Base Number Converter</h1>
            <div className={"container"}>
                <div className={"input-container"}>
                    <div className={"base-container"}>
                        {result && <p style={{ color: 'white', fontSize: '24px', textAlign:'center' }}>Result: {result}</p>}
                        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                    </div>
                    <h4>Number to convert:</h4>
                    <input
                        type="text"
                        placeholder="Enter number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <h4>From base:</h4>
                    <input
                        type="number"
                        min="2"
                        max="16"
                        placeholder="From Base (2-16)"
                        value={fromBase}
                        onChange={(e) => setFromBase(Number(e.target.value))}
                    />
                    <h4>To base:</h4>
                    <input
                        type="number"
                        min="2"
                        max="16"
                        placeholder="To Base (2-16)"
                        value={toBase}
                        onChange={(e) => setToBase(Number(e.target.value))}
                    />
                    <button onClick={handleConvert}>Convert</button>
                </div>
            </div>
        </div>
    );
};

export default MultiBaseConverter;