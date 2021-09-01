const LOAD_POLLS = 'polls/LOAD_POLLS'
const CREATE_POLL = 'polls/CREATE_POLL'
const DELETE_POLL = 'polls/DELETE_POLL'
const EDIT_POLL = 'polls/EDIT_POLL'

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
    default:
      return state;
  }
}

export default pollsReducer
