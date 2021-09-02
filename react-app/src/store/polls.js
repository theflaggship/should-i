const LOAD_POLLS = 'polls/LOAD_POLLS'
const CREATE_POLL = 'polls/CREATE_POLL'
const DELETE_POLL = 'polls/DELETE_POLL'
const EDIT_POLL = 'polls/EDIT_POLL'
const LOAD_VOTES = 'votes/LOAD_VOTES'
const CREATE_VOTE = 'votes/CREATE_VOTE'
const DELETE_VOTE = 'votes/DELETE_VOTE'

const loadVotes = votes => ({
  type: LOAD_VOTES,
  votes
})

const createVote = (optionId, index, pollId, user_voted) => ({
  type: CREATE_VOTE,
  optionId, index, pollId, user_voted
})

const deleteVote = vote => ({
  type: DELETE_VOTE,
  vote
})

const loadPolls = polls => ({
  type: LOAD_POLLS,
  polls
})

const createPoll = poll => ({
  type: CREATE_POLL,
  poll
})

const deletePoll = poll => ({
  type: DELETE_POLL,
  poll
})

const editPoll = poll => ({
  type: EDIT_POLL,
  poll
})

export const getPolls = () => async dispatch => {
  const res = await fetch('/api/polls/');

  if (res.ok) {
    const polls = await res.json()
    console.log('------------------------------------');
    console.log(polls);
    console.log('------------------------------------');
    dispatch(loadPolls(polls.polls));
    return res
  }
}

export const getUserPolls = (id) => async dispatch => {
  const res = await fetch(`/api/users/${id}/polls/`)

  if (res.ok) {
    const polls = await res.json()
    dispatch(loadPolls(polls.polls))
    return res
  }
}

export const createOnePoll = (question, options, image, user) => async dispatch => {
  const res = await fetch('/api/polls/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question,
      options: options.join(","),
      image
    })
  });

  const data = await res.json()

  if (res.ok) {
    const formattedPoll = {
      created_at: data.poll.created_at,
      id: data.poll.id,
      options: [...data.options],
      question: data.poll.question,
      total_votes: 0,
      user: {...user},
      user_id: data.poll.user_id,
    }
    dispatch(createPoll(formattedPoll))
    return data;
  }
}


export const editOnePoll = (pollId, question, options, image, user) => async dispatch => {
  const res = await fetch(`/api/polls/${pollId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question,
      options: options.join(","),
      image
    })
  })

  const data = await res.json()

  if (res.ok) {
    const formattedPoll = {
      created_at: data.poll.created_at,
      id: data.poll.id,
      options: [...data.options],
      question: data.poll.question,
      total_votes: data.poll.total_votes,
      user: {...user},
      user_id: data.poll.user_id,
    }
    dispatch(editPoll(formattedPoll))
    return data
  }
}


export const deleteOnePoll = (id) => async dispatch => {
  const deleted = await fetch(`/api/polls/${id}/`, {
    method: 'DELETE',
  })
  if (deleted) {
     dispatch(deletePoll(id))
    return deleted
  }
}

export const getAllVotes = () => async dispatch => {
  const res = await fetch('api/votes/')

  if (res.ok) {
    const votes = await res.json()
    dispatch(loadVotes(votes))
    return res
  }
}

export const getOptionVotes = (pollId, optionId) => async dispatch => {
  const res = await fetch(`/api/polls/${pollId}/options/${optionId}/votes/`)

  if (res.ok) {
    const votes = await res.json()
    dispatch(loadVotes(votes.votes))
    return res
  }
}

export const castOneVote = (optionId, index, pollId, user_voted) => async dispatch => {
  const res = await fetch(`/api/polls/${pollId}/options/${optionId}/votes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })


    dispatch(createVote(optionId, index, pollId, user_voted))


}

const pollsReducer = (state = {}, action) => {
  if (!action) return state;
  switch (action.type) {
    case LOAD_POLLS: {
      const newState = {}
      action.polls.forEach(poll => {
        newState[poll.id] = poll
      })
      return newState
    }
    case CREATE_POLL: {
      const newState = {
        ...state,
        [action.poll.id]: action.poll
      };
      return newState
    }
    case EDIT_POLL: {
      const newState = {
        ...state,
        [action.poll.id]: action.poll
      };
      return newState
    }
    case DELETE_POLL: {
      const newState = {...state};
      delete newState[action.poll]
      return newState
    }
    case LOAD_VOTES: {
      return { ...state, ...action.votes}
    }
    case CREATE_VOTE: {
      console.log('------------------------------------');
      console.log(action);
      console.log('------------------------------------');
      const {optionId, index, pollId} = action
      let nextVoteCount
      let nextUserVoted
      if (action.user_voted) {
        nextVoteCount = state[action.pollId].options[index].vote_count + 1
        nextUserVoted = true
      } else {
        nextVoteCount = state[action.pollId].options[index].vote_count - 1
        nextUserVoted = false
      }
      const {options} = state[pollId]
      const nextOptions = [
          ...options.slice(0, index),
          {
            ...options[index], vote_count: nextVoteCount, user_voted: nextUserVoted
          },
          ...options.slice(index + 1)
      ]
      const newState = {...state}
      newState[pollId].options = nextOptions
      return newState
    }

    case DELETE_VOTE: {
      const newState = {...state};
      delete newState[action.vote]
      return newState
    }
    default:
      return state;
  }
}

export default pollsReducer
