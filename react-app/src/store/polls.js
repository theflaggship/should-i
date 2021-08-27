const LOAD_POLLS = 'polls/GET_POLLS'
const CREATE_POLL = 'polls/CREATE_POLL'
const DELETE_POLL = 'polls/DELETE_POLL'

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

export const getPolls = () => async dispatch => {
  const res = await fetch('/api/polls/');

  if (res.ok) {
    const polls = await res.json()
    dispatch(loadPolls(polls.polls));
    return res
  }
}

export const createOnePoll = (question) => async dispatch => {
  const res = await fetch('/api/polls/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question
    })
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createPoll(data))
    return data
  } else if (res.status < 500) {
      const data = await res.json();
      if (data) {
        return data
      }
  } else {
    return ['An error occurred. Try again.']
  }
}

export const deleteOnePoll = (id) => async dispatch => {
  const res = await fetch(`/api/polls/${id}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const deleted = await res.json()
    dispatch(deletePoll(id))
    return deleted
  }
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
    case DELETE_POLL: {
      const newState = {...state};
      delete newState[action.poll.id]
      return newState
    }
    default:
      return state;
  }
}

export default pollsReducer
