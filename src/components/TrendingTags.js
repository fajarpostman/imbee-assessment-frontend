import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Styling.css'

const TrendingTags = ({ selectedTag, setSelectedTag }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const result = await axios.get(
                'https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow'
            );

            setTags(result.data.items.slice(0, 10));
            setSelectedTag(result.data.items[0].name);
        };
        fetchTags();
    }, [setSelectedTag]);

    return (
        <div className="trending-tags">
            {tags.map((tag) => (
                <button
                    key={tag.name}
                    onClick={() => setSelectedTag(tag.name)}
                    className={selectedTag === tag.name ? 'selected' : ''}
                >
                    {tag.name}
                </button>
            ))}
      </div>
    );
};

export default TrendingTags;