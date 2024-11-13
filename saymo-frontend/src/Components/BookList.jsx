import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
import BeatLoader from 'react-spinners/BeatLoader';
import ConfirmModal from './ConfirmModal';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/books`, {
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
        setBooks(data);
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          setError('Oops! Something went wrong.');
        } else {
          setError(error.message || 'Oops! Something went wrong while retrieving the books.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const confirmDelete = async () => {
    setDeleting(true); 
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${bookToDelete}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      setBooks(books.filter(book => book.id !== bookToDelete));
      setBookToDelete(null);
      setIsModalOpen(false);
    } catch (error) {
      setError('Oops! Something went wrong while deleting the book.');
    } finally {
      setDeleting(false); 
    }
  };

  const openDeleteModal = (id) => {
    setBookToDelete(id);
    setIsModalOpen(true);
  };

  const bookToDeleteTitle = books.find(book => book.id === bookToDelete)?.title; 

  return (
    <div className="book-list">
      <h1>Book Management System</h1>
      {loading || deleting ? ( 
        <div className="spinner-container">
          <BeatLoader color="#003366" loading={loading || deleting} size={15} />
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {books.length === 0 ? (
            setError('No Books Available.')
          ) : (
            <ul>
              {books.map(book => (
                <li key={book.id} className="book-card">
                  <div className="book-cover">
                    <FaBook size={100} color="#003366" />
                  </div>
                  <div className="book-details">
                    <h3>{book.title}</h3>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Year:</strong> {book.published_year}</p>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <div className="action-icons">
                      <Link to={`/view-book/${book.id}`}><FaEye /></Link>
                      <Link to={`/edit-book/${book.id}`}><FaEdit /></Link>
                      <button
                        className="delete"
                        onClick={() => openDeleteModal(book.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete "${bookToDeleteTitle}"?`} 
        actionType="delete" 
      />
    </div>
  );
};

export default BookList;
