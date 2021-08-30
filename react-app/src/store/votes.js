const LOAD_VOTES = 'votes/LOAD_VOTES'
const CREATE_VOTE = 'votes/CREATE_VOTE'

const loadVotes = votes => ({
  type: LOAD_VOTES,
  votes
})

const createVote = vote => ({
  type: CREATE_VOTE,
  vote
})

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

export const createOneVote = (optionId, pollId) => async dispatch => {
  const res = await fetch(`/api/polls/${pollId}/options/${optionId}/votes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const vote = await res.json()


  dispatch(createVote(vote))
  return vote
}

const votesReducer = (state = {}, action) => {
  if (!action) return state;
  switch(action.type) {
    case LOAD_VOTES: {
      return { ...state, ...action.votes}
    }
    case CREATE_VOTE: {
      const newState = {
        ...state,
        votes: [...state.votes, action.vote]
      }
      return newState
    }
    default:
      return state;
  }
}

export default votesReducer
