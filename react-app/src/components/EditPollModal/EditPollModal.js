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
  const [image, setImage] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPolls())
  }, [dispatch])


	const onEdit = async (e) => {
		e.preventDefault();
		const data = await dispatch(
			editOnePoll(
        poll.id,
				question,
        options,
        image,
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
      setOptions(options.splice(index))
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
    setImage(e.target.checked)
}

	return (
		<div className='new-poll-container'>
			<form onSubmit={onEdit}>
				<div className='errors-container'>
					{errors.map((error, ind) => (
						<div className="errors" key={ind}>{error}</div>
					))}
				</div>
					<textarea
						className='question-input'
						placeholder=' Should I...'
						type='text'
						onChange={updateQuestion}
						value={question}
						required={true}></textarea>
          <input
              type='checkbox'
              className='image-checkbox'
              onChange={updateImage}
              value={image}></input>
          {options.map((option, index) => {
            return (
              <div>
                <input
                  value={options[index]}
                  onChange={(e) => updateOption(e.target.value, index)}/>
                <div className="delete-option-button" onClick={() => removeOption(index)} hidden={options.length < 3}>
                  <i className="fas fa-minus-circle"></i>
                </div>
              </div>
            )
          })}
            <div className="add-option-button" onClick={() => addOption()} hidden={options.length >= 4}>
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
