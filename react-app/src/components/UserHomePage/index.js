import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPolls, editOnePoll} from "../../store/polls"
import './UserHomePage.css'
import DeletePollModal from '../DeletePollModal';
import EditPollModal from '../EditPollModal';
import { createOneVote, getOptionVotes } from '../../store/votes';

function HomePage() {
  const user = useSelector(state => state.session.user)
  const polls = useSelector(state => Object.values(state.polls))
  const sortedPolls = polls.reverse()
  const dispatch = useDispatch();


  const handleVote = (optionId, pollId) => {
    dispatch(createOneVote(optionId, pollId))
  }

  useEffect(() => {
    dispatch(getPolls())
  }, [dispatch])

  return (
      <div className="user-home-container">
        {sortedPolls?.map((poll) => (
          <div className="poll-container">
            <div className="user-info-container">
                <div className="profile-pic-container">
                  <img className="profile-pic" src={poll?.user?.profile_pic}/>
                </div>
                <div className="poll-username">{poll?.user?.username}</div>
                {(poll.user_id === user.id) &&
                  <>
                    <DeletePollModal pollId={poll?.id} />
                    <EditPollModal poll={poll} />
                  </>
                }
            </div>
            <div key={poll?.id}>{poll?.question}</div>
              <div className="options-container">
                {poll.options?.map((option) =>
                   option.image ?
                   <img onClick={() => handleVote(option.id, poll.id)} key={option.id} className="option-image" src={option.content} />
                   :
                   <div onClick={() => handleVote(option.id, poll.id)} key={option.id} className="option-string"> {option.content}</div>
                )}
              </div>
          </div>
        ))}
      </div>
  )
}

export default HomePage
