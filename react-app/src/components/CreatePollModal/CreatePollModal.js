import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createOnePoll } from '../../store/polls';
import { createOneOption } from '../../store/options';

const CreatePollForm = ({setShowModal}) => {
	const [errors, setErrors] = useState([]);
	const [question, setQuestion] = useState('');
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('');
  const [content4, setContent4] = useState('');
  const [image, setImage] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

  let optionCount = 2

	const onCreate = async (e) => {
    const allContent = [content1, content2]
    if (content3) allContent.push(content3)
    if (content4) allContent.push(content4)
		e.preventDefault();
			const data = await dispatch(
				createOnePoll(
					question
				)
			);

      if (data) {
				setErrors(data);
			}

      allContent.forEach((content) => async dispatch => {
        let optionData = await dispatch(
          createOneOption(content, image)
          )
          if (optionData) {
            setErrors(errors.concat(optionData))
          }
      })

			if (!errors) {
				setShowModal(false)
			}
	};

	const updateQuestion= (e) => {
		setQuestion(e.target.value);
	};

  const updateContent1= (e) => {
		setContent1(e.target.value);
	};

  const updateContent2= (e) => {
		setContent2(e.target.value);
	};

  const updateContent3= (e) => {
		setContent3(e.target.value);
	};

  const updateContent4= (e) => {
		setContent4(e.target.value);
	};

  const updateImage = async (e) => {
    setImage(e.target.checked)
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
          <div className="option-container">
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
