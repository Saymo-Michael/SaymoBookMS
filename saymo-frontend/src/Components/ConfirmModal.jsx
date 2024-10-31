import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message, actionType }) => {
  const confirmButtonStyle = actionType === 'update' 
    ? { backgroundColor: '#00796B', borderColor: '#00796B' } 
    : { backgroundColor: '#C8102E', borderColor: '#C8102E' }; 

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{actionType === 'update' ? 'Update Confirmation' : 'Delete Confirmation'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          style={confirmButtonStyle}
        >
          {actionType === 'update' ? 'Update' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
