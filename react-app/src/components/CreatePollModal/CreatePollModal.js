import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createOnePoll, getPolls } from '../../store/polls';
import { createOneOption } from '../../store/options';

const CreatePollForm = ({setShowModal}) => {
	const [errors, setErrors] = useState([]);
	const [question, setQuestion] = useState('');
  // const [content1, setContent1] = useState('');
  // const [content2, setContent2] = useState('');
  // const [content3, setContent3] = useState('');
  // const [content4, setContent4] = useState('');
  const [options, setOptions] = useState(['','']);
  // const [showOption3, setShowOption3] = useState(false)
  // const [showOption4, setShowOption4] = useState(false)
  // const [optionCount, setOptionCount] = useState(2)
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


  // let newOptionCount = optionCount
  // const addOption = (e) => {
  //   e.preventDefault()
  //   newOptionCount +=1
  //   setOptionCount(newOptionCount)

  //   if (newOptionCount === 3) {
  //     setShowOption3(true)
  //   }
  //   if (newOptionCount === 4) {
  //     setShowOption3(true)
  //     setShowOption4(true)
  //   }
  // }

  const updateOption = (value, index) => {
    setOptions([
      ...options.slice(0, index),
      {...options[index], content: value},
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


  // const updateContent1= (e) => {
	// 	setContent1(e.target.value);
	// };

  // const updateContent2= (e) => {
	// 	setContent2(e.target.value);
	// };

  // const updateContent3= (e) => {
	// 	setContent3(e.target.value);
	// };

  // const updateContent4= (e) => {
	// 	setContent4(e.target.value);
	// };

  const updateImage = (e) => {
    setImage(e.target.checked)
  }

  const updateQuestion = (e) => {
    setQuestion(e.target.value)
  }

	return (
		<div className='new-poll-container'>
			<form onSubmit={onCreate}>
				<div className='errors-container'>
					{errors.map((error, ind) => (
						<div className="errors" key={ind}>{error}</div>
					))}
				</div>
					<textarea
						className='question-input'
						placeholder='   Should I...'
						type='text'
						onChange={updateQuestion}
						value={question}
						required={true}></textarea>
          <input
              type='checkbox'
              className='image-checkbox'
              onChange={updateImage}
              value={image}></input>
          {options.map((content, index) => {
            return (
              <div>
                <input
                  value={options[index].content}
                  placeholder={`Option ${index + 1}`}
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
          {/* <div className="option-container">
					  <input
					  	className='option-input'
					  	placeholder=' Option 1'
					  	type='text'
					  	onChange={updateContent1}
					  	value={content1}
					  	required></input>
          </div>
          <div className="option-container">
					  <input
					  	className='option-input'
					  	placeholder=' Option 2'
					  	type='text'
					  	onChange={updateContent2}
					  	value={content2}
					  	required></input>
          </div>
          { showOption3 &&
            <div className="option-container">
					  <input
					  	className='option-input'
					  	placeholder=' Option 3'
					  	type='text'
					  	onChange={updateContent3}
					  	value={content3}
					  	required></input>
            </div>}
            { showOption4 &&
              <div className="option-container">
					    <input
					  	  className='option-input'
					  	  placeholder=' Option 4'
					  	  type='text'
					  	  onChange={updateContent4}
					  	  value={content4}
					  	  required></input>
            </div>} */}

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
