import React, { useState } from 'react';
import TrendingTags from '../components/TrendingTags';
import QuestionList from '../components/QuestionList';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <div className="home-page">
      <SearchBar onSearch={(keyword) => console.log('Search:', keyword)} />
      <TrendingTags selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <QuestionList selectedTag={selectedTag} />
    </div>
  );
};

export default HomePage;