import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    }, []);

    return (
        <div className='trending-tags'>
            {tags.map((tag) =>(
                <button
                    key={tag.name}
                    onClick={() => setSelectedTag(tag.name)}
                    className={selectedTag == tag.name ? 'selected' : ''}
                    style={{ borderRadios: '10px', margin: '5px', padding: '5px'}}>
                        {tag.name}
                </button>
            ))}
        </div>
    );
};

export default TrendingTags;