import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editOnePoll, getPolls } from '../../store/polls';
import { createOneOption } from '../../store/options';

const EditPoll = ({poll, setShowModal}) => {
  let optionsArray = []
  poll.options.forEach(option => {
    optionsArray.push(option.content)
  })
	const [errors, setErrors] = useState([]);
	const [question, setQuestion] = useState(poll.question);
  const [options, setOptions] = useState(optionsArray);
  const [isImage, setIsImage] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();


  function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };
  const validURL = options.every(option => isValidURL(option))
  const validOption = options.every(option => option !== '')

  useEffect(() => {
    if (poll.options[0].image) {
      setIsImage(true)
    }
  }, [])


	const onEdit = async (e) => {
		e.preventDefault();

    if (!validOption) {
      setErrors(["One or more options are missing"])
      return
    }
    if (isImage && !validURL) {
      setErrors(["Image URLs are not valid"])
      return
    }

		const data = await dispatch(
			editOnePoll(
        poll.id,
				question,
        options,
        isImage,
        user
			)
		);

    if (data.errors) {
			setErrors(data.errors);
		} else {
      setShowModal(false)
    }
	};

  const updateOption = (value, index) => {
    setOptions([
      ...options.slice(0, index),
      value,
      ...options.slice(index + 1)
    ])
  }

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions([...options.slice(0, index), ...options.slice(index + 1)])
    }
  }

  const addOption = () => {
    if (options.length < 4) {
      setOptions([
        ...options,
        ''
      ])
    }
  }

	const updateQuestion= (e) => {
		setQuestion(e.target.value);
	};


  const updateImage = (e) => {
    setIsImage(e.target.checked)
}

	return (
		<div className='new-poll-container'>
      <p className="new-poll-title">Edit your poll:</p>
			<form onSubmit={onEdit}>
				<div className='errors-container'>
					{errors.map((error, ind) => (
						<div className="errors" key={ind}>{error}</div>
					))}
				</div>
          <div>
					  <textarea
					  	className='question-input'
					  	placeholder=' Should I...'
					  	type='text'
					  	onChange={updateQuestion}
					  	value={question}
					  	required={true}></textarea>
          </div>
          <div className="image-checkbox-container">
            <label>Image URLs?</label>
            <input
                type='checkbox'
                checked={isImage}
                className='image-checkbox'
                onChange={updateImage}
                // value={isImage}
                />
          </div>
          {options.map((option, index) => {
            return (
              <div className="create-options-container">
                <input
                  className="create-options-input"
                  value={options[index]}
                  // required={true}
                  placeholder={`  Option ${index + 1}`}
                  onChange={(e) => updateOption(e.target.value, index)}/>
                <div className="delete-option-button" onClick={() => removeOption(index)} hidden={options.length < 3}>
                  <i className="fas fa-minus-circle"></i>
                </div>
              </div>
            )
          })}
            <div className="add-option-button-create-poll" onClick={() => addOption()} hidden={options.length >= 4}>
              <i className="fas fa-plus-circle"></i>
            </div>
				  <div className='create-button-container'>
					  <button className='edit-poll-button' type='submit'>
					  	Save
					  </button>
			  	</div>
			</form>
		</div>
	);
};

export default EditPoll;
