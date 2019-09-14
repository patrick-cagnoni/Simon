import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AppDialog = props => {

    const { show, onClose, onConfirm, title, message } = props;
    return ( 
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
     );
}
 
export default AppDialog;