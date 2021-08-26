import React, { useState } from 'react';
import { Modal } from '../../context/Modal.js';
import SignUpForm from './SignUpFormModal';
import './SignUpFormModal.css';

function SignUpFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div id='splash-signup-button' onClick={() => setShowModal(true)}>
				Sign Up
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<div className='signup-title-container'>
						<h3 className='signup-title'>Should I Sign Up? Yes!</h3>
					</div>
					<SignUpForm />
				</Modal>
			)}
		</>
	);
}

export default SignUpFormModal;
