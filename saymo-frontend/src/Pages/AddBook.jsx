import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../Components/BookForm'; 
import './Pages.css';  

const AddBook = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleAddBook = async (newBook) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unexpected error occurred.');
      }

      setSuccessMessage('Book added successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/');
      }, 2000);
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setErrorMessage('Failed to connect to the server. Please check your internet connection or try again later.');
      } else {
        setErrorMessage(error.message || 'Oops! Something went wrong while creating the book.');
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);  
    }
  };

  return (
    <div>
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
      <BookForm onSubmit={handleAddBook} />
    </div>
  );
};

export default AddBook;
