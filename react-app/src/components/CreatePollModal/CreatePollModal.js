import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createOnePoll, getPolls } from '../../store/polls';

const CreatePollForm = ({setShowModal}) => {
	const [errors, setErrors] = useState([]);
	const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [image, setImage] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPolls())
  }, [dispatch])

	const onCreate = async (e) => {
		e.preventDefault();
		const data = await dispatch(
			createOnePoll(
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

  const updateImage = (e) => {
    setImage(e.target.checked)
  }

  const updateQuestion = (e) => {
    setQuestion(e.target.value)
  }

	return (
		<div className='new-poll-container'>
      <p className="new-poll-title">Create new poll:</p>
			<form onSubmit={onCreate}>
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
                className='image-checkbox'
                onChange={updateImage}
                value={image}></input>
          </div>
          {options.map((option, index) => {
            return (
              <div className="create-options-container">
                <input
                  className="create-options-input"
                  value={options[index]}
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
					  <button className='create-poll-button' type='submit'>
					  	Ask Away
					  </button>
			  	</div>
			</form>
		</div>
	);
};

export default CreatePollForm;
