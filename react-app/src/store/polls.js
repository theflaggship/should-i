const LOAD_POLLS = 'polls/GET_POLLS'
const CREATE_POLL = 'polls/CREATE_POLL'

const loadPolls = polls => ({
  type: LOAD_POLLS,
  polls
})

const createPoll = poll => ({
  type: CREATE_POLL,
  poll
})

export const getPolls = () => async dispatch => {
  const res = await fetch('/api/polls');

  if (res.ok) {
    const polls = await res.json()
    dispatch(loadPolls(polls.polls));
    return res
  }
}

export const createOnePoll = (question) => async dispatch => {
  const req = await fetch('api/polls/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question
    })
  });

  if (req.ok) {
    const data = await req.json();
    dispatch(createPoll(data))
  } else if (req.status < 500) {
      const data = await req.json();
      if (data.errors) {
        return data.errors
      }
  } else {
    return ['An error occurred. Try again.']
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
      const newState = {...state}
      return newState
    }
    default:
      return state;
  }
}

export default pollsReducer
