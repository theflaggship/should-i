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
          <>
          <div>{poll.question}</div>
          </>
        ))}
      </div>
  )
}

export default HomePage
