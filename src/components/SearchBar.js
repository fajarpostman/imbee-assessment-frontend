import React, { useState } from 'react';
import '../styles/Styling.css'

const SearchBar = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        onSearch(keyword);
    };

    return (
        <div className="search-bar">
            <input
                type='text'
                placeholder='Search...'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchBar;