import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePollForm from './CreatePollModal'
import './CreatePollModal.css'

function CreatePollModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <div className="add-poll-button" onClick={() => setShowModal(true)}>
        <img className="add-poll-icon" src="https://i.imgur.com/rmyz3F2.png"/>
      </div> */}
        <div className="add-poll-button" onClick={()=> setShowModal(true)}>
          <i class="fas fa-plus-circle"></i>
        </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePollForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  )
}

export default CreatePollModal;
