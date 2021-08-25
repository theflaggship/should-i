import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPolls } from "../../store/polls"
import './UserHomePage.css'

function HomePage() {
  const user = useSelector(state => state.session.user)
  const polls = useSelector(state => Object.values(state.polls))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPolls())
  }, [dispatch])
  return (
      <div className="user-home-container">
        {polls?.map((poll) => (
          <div className="poll-container">
            <div>{poll.question}</div>
              <div className="options-container">
                {poll.options?.map((option) =>
                   {option.image? <img key={option.id} src={option.content} /> : <div key={option.id}> {option.content}</div>}
                )}
              </div>
          </div>
        ))}
      </div>
  )
}

export default HomePage
