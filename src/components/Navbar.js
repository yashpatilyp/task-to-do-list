// Navbar.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaRegStar } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

                           //....pass board name in task 
export default function Navbar({ addBoard }) {
  const [showModal, setShowModal] = useState(false);
  const [boardName, setBoardName] = useState("");

  const handleAddBoard = () => {
    if (boardName.trim() !== "") {
      addBoard(boardName);
      setShowModal(false);
      setBoardName(""); 
    }
  };

  return (
    <nav className="navbar navbar-light py-3">
      <div className="container-fluid">
        <h1 className=" mb-0 h1 py-1 "><span className="mb-1"><IoMdHome style={{color:"blueviolet"}}/>    <FaRegStar/>  </span> Task Management</h1>
        <div className="d-flex">
          <button className="formcontrol btn-navbar" onClick={() => setShowModal(true)}>
            Create New Board
          </button>
        </div>
      </div>

      {/* Modal for entering board name */}
    
      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <div className="model">
        <Modal.Header closeButton >
          <h4>Enter Board Name</h4>
        </Modal.Header>
        <Modal.Body>
          <h5>Enter the name of the new board:</h5>
          <input
            type="text"
            className="form-control"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          
          <Button  className="btn-navbar" onClick={handleAddBoard}>
            Add Board
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
  
      
    </nav>
  );
}
