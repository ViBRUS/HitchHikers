import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchComponent = ({type, placeholder}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounce mechanism
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue) {
        fetchOptions(inputValue);
      } else {
        setOptions([]);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const fetchOptions = async (query) => {
    setIsLoading(true);
    try {
      // Replace with your API call
    //   const response = await axios.get(https://api.example.com/options?query=${query});
      const response = await axios.get(`http://localhost:3000/api/airplane/list/Airports?keyword=${query}`);
      console.log(response);
      setOptions(response?.data?.airports);
    } catch (error) {
      console.error('Error fetching options:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowDropdown(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setShowDropdown(false);
  };

  return (
    <div className="debounce-dropdown">
      <input
        type={TypeError}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {showDropdown && (
        <ul className="dropdown">
          {isLoading ? (
            <li>Loading...</li>
          ) : (
            options.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option?.detailedName}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;