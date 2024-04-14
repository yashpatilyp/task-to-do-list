import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import Navbar from "./Navbar";
import { FaPlus } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Modal, Button, Dropdown } from "react-bootstrap"; 

export default function Task() {

  // State for managing lists
  const [lists, setLists] = useState(() => {
    const storedLists = JSON.parse(localStorage.getItem("lists"));
    return storedLists
      ? storedLists
      : [
          { title: "To Do", cards: [] },
          { title: "Doing", cards: [] },
          { title: "Done", cards: [] },
        ];
  });

  // State for managing modal and selected list index
  const [showModal, setShowModal] = useState(false);
  const [selectedListIndex, setSelectedListIndex] = useState(null);

  // Function to add a new list
  const addBoard = (listName) => {
    setLists([...lists, { title: listName, cards: [] }]);
  };

  // ....................................................................................................................... 


  // Function to add a new card to a list
  const addCard = (listIndex, newTask) => {
    const timestamp = new Date().toLocaleString(); // Get current timestamp
    const card = { text: newTask, time: timestamp };
    const updatedLists = lists.map((list, index) => {
      if (index === listIndex) {
        return { ...list, cards: [...list.cards, card] };
      }
      return list;
    });
    setLists(updatedLists);
    setShowModal(false); 
  };

  // Function to delete a card from a list
  const deleteCard = (listIndex, cardIndex) => {
    const updatedLists = lists.map((list, lIndex) => {
      if (lIndex === listIndex) {
        return {
          ...list,
          cards: list.cards.filter((_, cIndex) => cIndex !== cardIndex),
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  // Function to delete a list
  const deleteList = (listIndex) => {
    const updatedLists = lists.filter((_, index) => index !== listIndex);
    setLists(updatedLists);
  };

  // Function to handle drag start
  const handleDragStart = (e, listIndex, cardIndex) => {
    e.dataTransfer.setData("listIndex", listIndex);
    e.dataTransfer.setData("cardIndex", cardIndex);
  };

  // Function to handle drop
  const handleDrop = (e, targetListIndex) => {
    const sourceListIndex = e.dataTransfer.getData("listIndex");
    const sourceCardIndex = e.dataTransfer.getData("cardIndex");

    const updatedLists = lists.map((list, listIndex) => {
      if (listIndex == sourceListIndex) {
        const cardToMove = list.cards[sourceCardIndex];
        return {
          ...list,
          cards: list.cards.filter((_, cardIndex) => cardIndex != sourceCardIndex),
        };
      } else if (listIndex == targetListIndex) {
        const cardToMove = lists[sourceListIndex].cards[sourceCardIndex];
        return {
          ...list,
          cards: [...list.cards, cardToMove],
        };
      }
      return list;
    });

    setLists(updatedLists);
  };

  // Update localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  // open the modal for a specific list
  const openModal = (listIndex) => {
    setSelectedListIndex(listIndex);
    setShowModal(true);
  };

  // close the modal
  const closeModal = () => {
    setSelectedListIndex(null);
    setShowModal(false);
  };

  return (
    <>
      
      <Navbar addBoard={addBoard} />

      <div className="row task">
        {lists.map((list, listIndex) => (
          <div
            className="col-sm-4 p-0"
            key={listIndex}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, listIndex)}
          >
            <div className=" m-1">
              <div className="card-body">
              
                <h4 className="card-title d-flex justify-content-between">
                  {list.title}
                
                  {listIndex >= 3 && (
                    <Dropdown>
                      <Dropdown.Toggle variant="link" id="dropdown-basic" style={{color:"white"}}>
                       
                      </Dropdown.Toggle>
                
                      <Dropdown.Menu>
                    
                        <Dropdown.Item onClick={() => deleteList(listIndex)}>Delete Board</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </h4>

               
                {list.cards.map((card, cardIndex) => (
                  <div
                    className={`card-task my-2 d-flex justify-content-between align-items-center`}
                    key={cardIndex}
                    draggable
                    onDragStart={(e) => handleDragStart(e, listIndex, cardIndex)}
                  >
                    <div className="" style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                    
                      <span>{card.text}</span>
                   
                      <small><IoMdTime /> {card.time}</small>
                    </div>
                 
                    <div>
                      <MdDelete
                        onClick={() => deleteCard(listIndex, cardIndex)}
                        style={{ color: "red" ,cursor:"pointer" }}
                      />
                    </div>
                  </div>
                ))}

           
                <button
                  className="card w-100 my-2 addbtn d-flex justify-content-center align-items-center py-2"
                  onClick={() => openModal(listIndex)}
                >
                  <div className="d-flex align-items-center">
                    <FaPlus />
                    <span className="ms-2">ADD TASK</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <Modal  show={showModal} onHide={closeModal} >
        <div className="model">
          <Modal.Header closeButton >
            <h4>Add Task</h4>
          </Modal.Header>
          <Modal.Body >
          
            <input
              type="text"
              id="taskInput"
              className="form-control mb-2"
              placeholder="Enter task..."
              required
            />
          </Modal.Body>
          <Modal.Footer>
       
            <Button
              className="btn-navbar"
              onClick={() =>
                addCard(
                  selectedListIndex,
                  document.getElementById("taskInput").value
                )
              }
            >
              Add Task
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
