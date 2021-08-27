import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePoll from './DeletePollModal'
import './DeletePollModal.css';

function DeletePollModal({pollId}) {
	const [showModal, setShowModal] = useState(false);

	return (
        <>
            <p className="delete-poll-icon" onClick={() => setShowModal(true)}><i className="fas fa-minus-circle"></i></p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeletePoll pollId={pollId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>

	);
}

export default DeletePollModal;
