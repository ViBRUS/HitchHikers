import React, { useState, useEffect, useContext } from 'react';
import services from '../common/services';
import AuthContext from '../context/AuthProvider';

const SearchComponent = ({typeProp, placeholderProp, onOptionSelect}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { auth } = useContext(AuthContext); 

  // Debounce mechanism
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue) {
        fetchOptions(inputValue);
      } else {
        setOptions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const fetchOptions = async (query) => {
    setIsLoading(true);
    try {
      const token = `Bearer ${auth.token}`;
      services.getAirports(query, auth.token).then(response => {
        if (response?.success) {
          setOptions(response.data?.airports);
        }
      });
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
    setInputValue(option?.detailedName);
    setShowDropdown(false);
    if(onOptionSelect){
        onOptionSelect(option)
    }
  };

  return (
    <div className="debounce-dropdown">
      <input
        type={typeProp}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholderProp}
      />
      {showDropdown && (
        <ul className="dropdown">
          {isLoading ? (
            <li>Loading...</li>
          ) : (
            options.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)} style={{fontSize: "1rem"}}>
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