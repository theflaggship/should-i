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

export const getOptionVotes = (pollId, optionId) => async dispatch => {
  const res = await fetch(`/api/polls/${pollId}/options/${optionId}/votes/`)

  if (res.ok) {
    const data = await res.json()
    dispatch(loadVotes(data.votes))
    return data
  }
}

export const createOneVote = (optionId, pollId) => async dispatch => {
  const res = await fetch(`/api/polls/${pollId}/options/${optionId}/votes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const vote = await res.json()
  dispatch(createVote(vote))
  return vote
}

const votesReducer = (state = {}, action) => {
  if (!action) return state;
  switch(action.type) {
    case LOAD_VOTES: {
      const newState = {}
      action.votes.forEach(vote => {
        newState[vote.id] = vote
      })
      return newState
    }
    case CREATE_VOTE: {
      const newState = {
        ...state,
        [action.vote.id]: action.vote
      }
      return newState
    }
    default:
      return state;
  }
}

export default votesReducer
