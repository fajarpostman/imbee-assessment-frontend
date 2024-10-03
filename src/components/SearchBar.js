import React from 'react';

const SearchBar = ({ onSearch }) => {
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
    <div className="search-bar">
        <input
            type="text"
            placeholder="Cari Tag..."
            onChange={handleInputChange}
            style={{ padding: '10px', width: '100%' }}
        />
    </div>
    )
}

export default SearchBar;