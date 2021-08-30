import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserPolls, deleteOnePoll } from '../../store/polls';
import './UserPollsPage.css'
import DeletePollModal from '../DeletePollModal';

function UserPollsPage() {
  const user = useSelector(state => state.session.user)
  const polls = useSelector(state => [...Object.values(state.polls)])
  const sortedPolls = polls.reverse()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPolls(user.id))
  }, [dispatch])

  return (
      <div className="user-home-container">
        {sortedPolls?.map((poll) => (
          <div className="poll-container">
            <div className="user-info-container">
                <div className="profile-pic-container">
                  <img className="profile-pic" src={user?.profile_pic}/>
                </div>
                <div className="poll-username">{user?.username}</div>
                  <DeletePollModal pollId={poll?.id} />
            </div>
            <div key={poll?.id}>{poll?.question}</div>
              <div className="options-container">
                {poll.options?.map((option) =>
                   option.image ?
                   <img key={option.id} className="option-image" src={option.content} /> :
                   <div key={option.id} className="option-string"> {option.content}</div>
                )}
              </div>
          </div>
        ))}
      </div>
  )
}

export default UserPollsPage
