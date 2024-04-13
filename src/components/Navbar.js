// Navbar.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Navbar({ addBoard }) {
  const [showModal, setShowModal] = useState(false);
  const [boardName, setBoardName] = useState("");

  const handleAddBoard = () => {
    if (boardName.trim() !== "") {
      addBoard(boardName);
      setShowModal(false);
      setBoardName(""); // Clear the board name after adding
    }
  };

  return (
    <nav className="navbar navbar-light py-3">
      <div className="container-fluid">
        <h1 className=" mb-0 h1">Task Management</h1>
        <div className="d-flex">
          <button className="formcontrol btn-navbar" onClick={() => setShowModal(true)}>
            Create New Board
          </button>
        </div>
      </div>

      {/* Modal for entering board name */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Board Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the name of the new board:</p>
          <input
            type="text"
            className="form-control"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddBoard}>
            Add Board
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}
