const CREATE_OPTION = 'options/CREATE_OPTION'
const EDIT_OPTION = 'options/EDIT_OPTION'

const createOption = option => ({
  type: CREATE_OPTION,
  option
})

const editOption = option => ({
  type: EDIT_OPTION,
  option
})
export const createOneOption = (poll_id, content, image) => async dispatch => {
  const res = await fetch(`/api/polls/${poll_id}/options/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      poll_id, content, image
    })
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createOption(data))

  } else if (res.status < 500) {
    const data = await res.json();

    if (data.errors) {
      return data.errors
    }

  } else {
    return ['An error occurred. Try again.']
  }
}

export const editOneOption = (option_id, content, image, poll_id) => async dispatch => {
  const res = await fetch(`/api/polls/${poll_id}/options/${option_id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      image
    })
  })
  const option = await res.json()

  if (res.ok) {
    dispatch(editOption(option))
  }
  return option
}
const initialState = {options: []}

const optionsReducer = (state = initialState, action) => {
  if (!action) return state;

  switch (action.type) {
    case CREATE_OPTION: {
      const newState = {
        ...state,
        options: [...state.options, action.option]
      };
      return newState
    }
    default:
      return state;
  }
}

export default optionsReducer
