import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PollForm from './CreatePollModal'
import './CreatePollModal.css'

function CreatePollModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <div className="add-poll-button" onClick={() => setShowModal(true)}>
          <img src="https://i.imgur.com/DEL32n3.png"/>
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
