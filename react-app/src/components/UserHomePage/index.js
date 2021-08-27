import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPolls } from "../../store/polls"
import './UserHomePage.css'
import CreatePollModal from '../CreatePollModal'

function HomePage() {
  const user = useSelector(state => state.session.user)
  const polls = useSelector(state => Object.values(state.polls))
  const sortedPolls = polls.reverse()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPolls())
  }, [dispatch])
  return (
      <div className="user-home-container">
        <CreatePollModal />
        {sortedPolls?.map((poll) => (
          <div className="poll-container">
            <div className="user-info-container">
                <div className="profile-pic-container">
                  <img className="profile-pic" src={poll.user.profile_pic}/>
                </div>
                <div className="poll-username">{poll.user.username}</div>
              </div>
            <div key={poll.id}>{poll.question}</div>
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

export default HomePage
