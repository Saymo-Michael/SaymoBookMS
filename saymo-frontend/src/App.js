import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Pages/Home'; 
import AddBook from './Pages/AddBook'; 
import EditBook from './Pages/EditBook';
import ViewBook from './Pages/ViewBook';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Container style={{ marginLeft: '250px' }}> 
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/view-book/:id" element={<ViewBook />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
