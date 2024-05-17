import React, { useEffect, useState } from "react";
import Dropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";



const Convert = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [convertedAmount ,setConvertedAmount] = useState(null);
    const [converting , setConverting] = useState(false);
    const [favorites , setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || ["TRY", "EUR"]
    );

    // Fetching
    const fetchCurrencies = async () => {
        try {
            const res = await fetch("https://api.frankfurter.app/currencies");
            const data = await res.json();
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.log("Fetching Error", error);
        }
    };

    // Whenever my component loads
    useEffect(() => {
        fetchCurrencies();
    }, []);

    const currencyConvert = async () => {
        if (!amount) return;
        setConverting(true);
        try {
            const res = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
            );
            const data = await res.json();
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
            console.error("Error Fetching", error);
        } finally {
            setConverting(false);
        }
    };

    const handleFavorites = (currency) => {
        let updatedFavorites = [...favorites];
        if (favorites.includes(currency)) {
            updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
        } else {
            updatedFavorites.push(currency);
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-1xl font-semibold text-gray-700">Currency Converter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <Dropdown
                    currencies={currencies}
                    currency={fromCurrency}
                    setCurrency={setFromCurrency}
                    title="From:"
                    handleFavorites={handleFavorites}
                />
                <div className="flex justify-center mb-5 sm:mb-0 ">
                    <button onClick={swapCurrencies} className="p-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-300">
                    <HiArrowsRightLeft />
                    </button>
                </div>
                <Dropdown
                    currencies={currencies}
                    currency={toCurrency}
                    setCurrency={setToCurrency}
                    title="To:"
                    handleFavorites={handleFavorites}
                />
            </div>
            <div>
                <label htmlFor="amount">Amount : </label>
                <input
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                    type="number"
                    className="w-full p-2 border shadow-sm rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
            </div>
            <div className="flex justify-end mt-7">
                <button
                    onClick={currencyConvert}
                    className="px-5 py-2 bg-yellow-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2">
                    {converting ? "Converting..." : "Convert Money"}
                </button>
            </div>
            {convertedAmount && (
                <div className="mt-4 text-lg font-medium text-right text-green-600">
                    Converted Amount: {convertedAmount}
                </div>
            )}
        </div>
    );
};

export default Convert;
