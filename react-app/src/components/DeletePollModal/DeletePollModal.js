import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { deleteOnePoll } from '../../store/polls';
import './DeletePollModal.css'


function DeletePoll({pollId, setShowModal}) {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        const success = dispatch(deleteOnePoll(pollId));
        if (success) {
            e.preventDefault();
            setShowModal(false);
            return <Redirect to={`/`} />;
        } else {
            alert('Please try again')
        }
    };
    const handleCancel = ((e) => {
        e.preventDefault();
        setShowModal(false)
    });
    return (
        <div className="delete-confirmation-container">
          <div className="delete-confirmation-message">
            <p className="confirmation-message">Are you sure you want to delete this poll?</p>
          </div>
          <div className="delete-confirmation-buttons">
            <button className="delete-confirmation-button" onClick={handleDelete}>Delete</button>
            <button className="cancel-confirmation-button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      );
}


export default DeletePoll
