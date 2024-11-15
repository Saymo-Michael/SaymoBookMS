import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link} from 'react-router-dom';
import { FaArrowLeft} from 'react-icons/fa'; 
import BookForm from '../BookForm';
import BeatLoader from 'react-spinners/BeatLoader'; 
import './Pages.css'; 

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  const handleUpdate = async (updatedBook) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setSuccessMessage('Book updated successfully!');

      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/'); 
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Oops! Something went wrong while updating the book.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="spinner-container">
          <BeatLoader color="#003366" loading={loading} size={15} />
        </div>
      ) : (
        <>
          {successMessage && (
            <div className={`add-book-alert add-book-alert-success`}>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className={`add-book-alert add-book-alert-danger`}>
              {errorMessage}
            </div>
          )}
          {book ? ( 
            <BookForm book={book} onSubmit={handleUpdate} />
          ) : (
            <div className="error-message">
              <p>{error}</p>
              <Link to="/" className="back-button">
                <FaArrowLeft size={20} /> Back to Home
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditBook;
