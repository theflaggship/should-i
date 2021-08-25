const LOAD_POLLS = 'polls/GET_POLLS'

const loadPolls = polls => ({
  type: LOAD_POLLS,
  polls
})

export const getPolls = () => async dispatch => {
  const res = await fetch('/api/polls');

  if (res.ok) {
    const polls = await res.json()
    console.log('------------------------------------');
    console.log(polls);
    console.log('------------------------------------');
    dispatch(loadPolls(polls.polls));
    return res
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
    default:
      return state;
  }
}

export default pollsReducer
