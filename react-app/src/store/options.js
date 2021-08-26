const CREATE_OPTION = 'options/CREATE_OPTION'

const createOption = option => ({
  type: CREATE_OPTION,
  option
})

export const createOneOption = (poll_id, content, image) => async dispatch => {
  const req = await fetch(`api/polls/${poll_id}/options`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content, image
    })
  });

  if (req.ok) {
    const data = await req.json();
    dispatch(createOption(data))
  } else if (req.status < 500) {
      const data = await req.json();
      if (data.errors) {
        return data.errors
      }
  } else {
    return ['An error occurred. Try again.']
  }
}

const optionsReducer = (state = {}, action) => {
  if (!action) return state;
  switch (action.type) {
    case CREATE_OPTION: {
      const newState = {...state}
      return newState
    }
    default:
      return state;
  }
}

export default optionsReducer