import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUser, FaCalendarAlt, FaTags, FaInfoCircle, FaArrowLeft } from 'react-icons/fa'; 
import ConfirmModal from './ConfirmModal'; 
import './BookForm.css'; 

const BookForm = ({ book = {}, onSubmit }) => {
  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [year, setYear] = useState(book.published_year || '');
  const [genre, setGenre] = useState(book.genre || '');
  const [description, setDescription] = useState(book.description || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (book.id) {
      setIsModalOpen(true);
    } else {
      const bookData = {
        title,
        author,
        published_year: year,
        genre,
        description: description || null, 
      };
      onSubmit(bookData);
    }
  };

  const handleConfirm = () => {
    const bookData = {
      title,
      author,
      published_year: year,
      genre,
      description: description || null, 
    };
    onSubmit(bookData);
    setIsModalOpen(false);
  };

  return (
    <div className="book-form-container">
      <h2 className="form-title">{book.id ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">
              <FaBook /> Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">
              <FaUser /> Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">
              <FaCalendarAlt /> Published Year
            </label>
            <input
              type="number"
              id="year"
              value={year}
              min={1700}
              max={2024}
              onChange={(e) => setYear(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">
              <FaTags /> Genre
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="form-select"
            >
              <option value="">Select Genre</option>
              <option value="Adventure">Adventure</option>
              <option value="Biography">Biography</option>
              <option value="Classics">Classics</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="History">History</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label htmlFor="description">
              <FaInfoCircle /> Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              className="form-textarea"
              style={{ resize: 'none' }}
            />
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="submit-buttonForm">
            {book.id ? 'Update Book' : 'Add Book'}
          </button>
          <Link to="/" className="back-buttonForm">
            <FaArrowLeft /> Back
          </Link>
        </div>
      </form>

      {book.id && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          message={`Are you sure you want to update "${title}"?`}
          actionType="update"
        />
      )}
    </div>
  );
};

export default BookForm;
