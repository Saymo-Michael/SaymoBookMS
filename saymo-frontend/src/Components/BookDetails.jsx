import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { FaArrowLeft, FaBookOpen } from 'react-icons/fa'; 
import './BookDetails.css'; 

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message); 
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error.message || 'Oops! Something went wrong while retrieving the book.');
      } finally {
        setLoading(false); 
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div className='book-details-container'>
      <h1 className="details-title">Book Details</h1>
      {loading ? (
        <div className="spinner-container">
          <BeatLoader color="#003366" loading={loading} size={15} />
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <Link to="/" className="back-button">
            <FaArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      ) : (
        <div className="book-details-card">
          <div className="book-cover">
            <FaBookOpen size={120} color="#003366" />
          </div>
          <div className="book-info">
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Year:</strong> {book.published_year}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Description:</strong> {book.description}</p>
          </div>
          <Link to="/" className="back-button">
            <FaArrowLeft size={20} /> Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
