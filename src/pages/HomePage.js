import React, { useState } from 'react';
import TrendingTags from '../components/TrendingTags';
import QuestionList from '../components/QuestionList';
import SearchBar from '../components/SearchBar';
import '../styles/Styling.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [selectedTag, setSelectedTag] = useState('');
  const [searchKeyword, setSearchKeyword] = useState(''); // Initialize state for search keyword

  // Function to handle search from SearchBar
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword); // Update searchKeyword state
  };

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      <TrendingTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      {/* Pass searchKeyword to QuestionList */}
      <QuestionList selectedTag={selectedTag} searchKeyword={searchKeyword} />
    </div>
  );
};

export default HomePage;