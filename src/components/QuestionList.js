import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Styling.css'
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const QuestionList = ({ selectedTag }) => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setQuestions([]);
      setPage(1);
    }, [selectedTag]);

    useEffect(() => {
      if (selectedTag) {
        const fetchQuestions = async () => {
          setLoading(true);
          try {
            const result = await axios.get(
              'https://api.stackexchange.com/2.3/questions?page=20&pagesize=20&fromdate=1727568000&todate=1727913600&order=desc&sort=activity&site=stackoverflow'
            );
            setQuestions((prevQuestions) => [...prevQuestions, ...result.data.items]);
          } catch {
            console.error('Error fetching questions:', error.response);
          } finally {
            setLoading(false);
          }
        };

        fetchQuestions();
      }
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
<Container>
      {questions.map((question) => (
        <Row key={question.question_id} className="mb-3 align-items-center question-item">
          {/* Pertanyaan */}
          <Col xs={12} md={12}>
            <a href={question.link} target="_blank" rel="noopener noreferrer" className="question-title">
              {question.title}
            </a>
          </Col>

          {/* Score */}
          <Col xs={12} md={3} className="text-center">
            <p className="text-danger">Score</p>
            <p>{question.score}</p>
          </Col>

          {/* Answers */}
          <Col xs={12} md={3} className="text-center">
            <p className="text-success">Answers</p>
            <Button variant="success">{question.answer_count}</Button>
          </Col>

          {/* Viewed */}
          <Col xs={12} md={3} className="text-center">
            <p className="text-danger">Viewed</p>
            <p>{question.view_count}</p>
          </Col>

          {/* Profile Gambar dan Nama */}
          <Col xs={12} md={3} className="text-center">
            <Image
              src={question.owner.profile_image}
              alt={question.owner.display_name}
              roundedCircle
              style={{ width: '50px', height: '50px' }}
            />
            <div className="username">{question.owner.display_name}</div>
          </Col>
        </Row>
      ))}
      {loading && <p>Loading more questions...</p>}
    </Container>
  );
};

export default QuestionList;


{/* <p className="score">Score: {question.score}</p>
<p className="answers">Answers: {question.answer_count}</p>
<p className="viewed">Viewed: {question.view_count}</p>
<div className="profile">
  <span>{question.owner.display_name}</span>
  <img src={question.owner.profile_image} alt={question.owner.display_name} />
</div> */}