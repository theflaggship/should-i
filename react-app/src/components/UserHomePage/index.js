import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { getPolls } from "../../store/polls"
import TimeAgo from "timeago-react"
import './UserHomePage.css'
import DeletePollModal from '../DeletePollModal';
import EditPollModal from '../EditPollModal';
import { castOneVote, getAllVotes } from '../../store/polls';

function HomePage({userPolls}) {
  const user = useSelector(state => state.session.user)
  const polls = useSelector(state => Object.values(state.polls))
  let sortedPolls
  const dispatch = useDispatch();
  const location = useLocation()

  if (location.pathname === `/users/${user.id}/polls`) {
    sortedPolls = userPolls.filter(poll => poll.user_id === user.id).reverse()
  } else {
    sortedPolls = polls.reverse()
  }

  useEffect(() => {
    dispatch(getPolls())
  }, [dispatch])

  // const [optionImgClass, setOptionImgClass] = useState("option-image-container")
  // const [optionStringClass, setOptionStringClass] = useState("option-string-container")


  const handleVote = (optionId, index, pollId, user_voted) => {
    dispatch(castOneVote(optionId, index, pollId, user_voted))
  }

  const showEdit = (poll) => {
    let userVoted = false;
    let voteCount = 0;
    poll.options.forEach((option) => {
      voteCount += option.vote_count
      userVoted = userVoted || option.user_voted
    })
    return voteCount === 0 || (voteCount === 1 && userVoted)
  }


  return (
    <div className="user-home-container">
      {sortedPolls?.map((poll) => (
          <div key={poll.id} className="poll-container">
            <div className="user-info-container">
                <div className="profile-pic-container">
                  <img className="profile-pic" src={poll?.user?.profile_pic}/>
                </div>
                <div className="poll-username">{poll?.user?.username}</div>
                {(poll.user_id === user.id) &&
                  <>
                    <DeletePollModal pollId={poll?.id} />
                    {showEdit(poll) &&
                      <EditPollModal poll={poll} />
                    }
                  </>
                }
            </div>
            <div className="poll-question" key={poll?.id}>{poll?.question}</div>
              {poll.options[0].image ?
                <div className="image-options-container">
                  {poll?.options?.map((option, index) =>
                    <div style={{backgroundImage: `url(${option.content})`}} key={option.id} className={`${option.user_voted ? "image-voted" : ""} option-image-container`} onClick={() => handleVote(option.id, index, poll.id, option.user_voted)}>
                      {/* <img className="option-image-content" src={option.content} /> */}
                      <div className="image-vote-count-footer">
                        {option.vote_count === 1 ?
                          <div className="image-vote-count">{option.vote_count} Vote</div>
                          :
                          <div className="image-vote-count">{option.vote_count} Votes</div>
                        }
                      </div>
                    </div>
                  )}
                </div>
                :
                <div className="string-options-container">
                  {poll?.options?.map((option, index) =>
                    <div  onClick={() => handleVote(option.id, index, poll.id, option.user_voted)} key={option.id} className={`${option.user_voted ? "string-voted" : ""} option-string-container`}>
                    <div className="option-string-content" >{option.content}</div>
                    {option.vote_count === 1 ?
                      <div className="vote-count">{option.vote_count} Vote</div>
                      :
                      <div className="vote-count">{option.vote_count} Votes</div>
                    }
                    </div>
                  )}
                </div>
              }
          <div className="poll-footer">
            <TimeAgo datetime={poll.created_at} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default HomePage


//style={{backgroundColor: option.user_voted ? "green" : "white"}}
