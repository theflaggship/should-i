import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPolls, editOnePoll} from "../../store/polls"
import TimeAgo from "timeago-react"
import './UserHomePage.css'
import DeletePollModal from '../DeletePollModal';
import EditPollModal from '../EditPollModal';
import { createOneVote, getAllVotes } from '../../store/votes';

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
    dispatch(getAllVotes())
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
                    {poll.total_votes === 0 &&
                      <EditPollModal poll={poll} />
                    }
                    {/* {poll.options.every(option => {
                        if (!option.votes.length === 0) {
                          return <EditPollModal poll={poll} />
                        }
                    })
                    } */}
                  </>
                }
            </div>
            <div className="poll-question" key={poll?.id}>{poll?.question}</div>
              <div className="options-container">
                {poll?.options?.map((option) =>
                  option?.image ?
                  <div className= "option-image-container" onClick={() => handleVote(option.id, poll.id)}>
                    <img  key={option.id} className="option-image-content" src={option.content} />
                    <div className="vote-count-footer">
                    {option.votes?.length === 1 ?
                      <div className="vote-count">{option.votes?.length} Vote</div>
                      :
                      <div className="vote-count">{option.votes?.length} Votes</div>
                    }
                    </div>
                  </div>
                  :
                  <div onClick={() => handleVote(option.id, poll.id)} key={option.id} className="option-string-container">
                    <div className="option-string-content">{option.content}</div>
                    {option.votes?.length === 1 ?
                      <div className="vote-count">{option.votes?.length} Vote</div>
                      :
                      <div className="vote-count">{option.votes?.length} Votes</div>
                    }
                  </div>
                )}
              </div>
            <div className="poll-footer">
              <TimeAgo datetime={poll.created_at} />
            </div>
          </div>
        ))}
      </div>
  )
}

export default HomePage
