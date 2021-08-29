import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPoll from './EditPollModal'
import './EditPollModal.css';

function EditPollModal({poll}) {
	const [showModal, setShowModal] = useState(false);

	return (
        <>
          <p className="edit-poll-icon" onClick={() => setShowModal(true)}><i class="far fa-edit"></i></p>
          {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                  <EditPoll poll={poll} setShowModal={setShowModal} />
              </Modal>
          )}
        </>
	);
}

export default EditPollModal;
