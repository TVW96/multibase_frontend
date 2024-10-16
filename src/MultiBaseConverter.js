import React, { useState } from 'react';
import axios from 'axios';
import "./styles.css";

const MultiBaseConverter = () => {
    const [number, setNumber] = useState('');
    const [fromBase, setFromBase] = useState(2);
    const [toBase, setToBase] = useState(10);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

    const handleConvert = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/convert`, {
                number,
                from_base: fromBase,
                to_base: toBase,
            });
            setResult(response.data.result);
            setError('');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                const errorMessage = "'ERROR CODE 400'";
                setError(err.response.data.error);
                window.alert(errorMessage);
            } else {
                setError('An unexpected error occurred.');
            }
            setResult('');
        }
    };



    return (
        <div className={"App"}>
            <div className={"container"}>
                <div className={"input-container"}>
                    <h1>Base Number Converter</h1>
                    <div className={"base-container"}>
                        {result && <p className={"result"}>Result: {result}</p>}
                        {error && <p className={"error"}>{error}</p>}
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