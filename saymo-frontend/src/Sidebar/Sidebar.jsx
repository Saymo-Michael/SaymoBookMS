import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaPlus, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './Sidebar.css';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation(); // Get current location
  const [activeItem, setActiveItem] = useState(location.pathname);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const renderTooltip = (label) => (props) => (
    <Tooltip id={`tooltip-${label}`} {...props}>
      {label}
    </Tooltip>
  );

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const isHomeActive = activeItem === '/' || activeItem.includes('/view-book') || activeItem.includes('/edit-book');

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <Nav defaultActiveKey="/" className="flex-column">
        <div className="nav-toggle" onClick={toggleSidebar}>
          <FaBars />
        </div>
        <div className="nav-links">
          {expanded ? (
            <>
              <Nav.Link
                as={Link} to="/"
                className={`nav-item ${isHomeActive ? 'active' : ''}`}
              >
                <FaHome />
                <span className="nav-label">Home</span>
              </Nav.Link>
              <Nav.Link
                as={Link} to="/add-book"
                className={`nav-item ${activeItem === '/add-book' ? 'active' : ''}`}
              >
                <FaPlus />
                <span className="nav-label">Add Book</span>
              </Nav.Link>
            </>
          ) : (
            <>
              <OverlayTrigger
                placement="right"
                delay={{ show: 300, hide: 100 }}
                overlay={renderTooltip('Home')}
              >
                <Nav.Link
                  as={Link} to="/"
                  className={`nav-item ${isHomeActive ? 'active' : ''}`}
                >
                  <FaHome />
                </Nav.Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="right"
                delay={{ show: 300, hide: 100 }}
                overlay={renderTooltip('Add Book')}
              >
                <Nav.Link
                  as={Link} to="/add-book"
                  className={`nav-item ${activeItem === '/add-book' ? 'active' : ''}`}
                >
                  <FaPlus />
                </Nav.Link>
              </OverlayTrigger>
            </>
          )}
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
