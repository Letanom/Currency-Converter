import { HiMiniStar } from "react-icons/hi2";

const Dropdown = ({ 
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorites,
    title = "", 
}) => {
    return (
        <div>
            <label htmlFor={title}>{title}</label> 
            <div className="mt-1 relative"  >
                <select className="w-full border p-2 border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-700"
                
                    value={currency} //Selected money
                    onChange={(e)=>{setCurrency(e.target.value)}}// Update to selected money currency
                >
                    {currencies.map(currency => (
                        <option value={currency} key={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                
                <button 
                onClick={()=>handleFavorites(currency)}
                className="absolute inset-y-0 right-0 pr-8 text-yellow-500 flex items-center ">
                        <HiMiniStar />
                </button>
            </div>
        </div>
    );
};

export default Dropdown; 
