import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionList = ({ selectedTag }) => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            const result = await axios.get(
                'https://api.stackexchange.com/2.3/questions?page=20&pagesize=20&fromdate=1727568000&todate=1727913600&order=desc&sort=activity&site=stackoverflow'
            );
            setQuestions((previosQuestions) => [...previosQuestions, ...result.data.items]);
            setLoading(false);
        };

        fetchQuestions();
    }, [selectedTag, page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div className="question-list">
        {questions.map((question) => (
          <div key={question.question_id} className="question-item">
            <a href={question.link} target="_blank" rel="noopener noreferrer">
              {question.title}
            </a>
            <p>Score: {question.score}</p>
          </div>
        ))}
        {loading && <p>Loading more questions...</p>}
      </div>
    );
}



export default QuestionList;