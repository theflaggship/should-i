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

      allContent.forEach((content) => {
        let optionData = await dispatch(
          createOneOption(content)
          )
          if (optionData) {
            setErrors(errors.concat(optionData))
          }
      })

			if (!errors) {
				setShowModal(false)
			}
		};

	};

	const updateQuestion= (e) => {
		setQuestion(e.target.value);
	};

  const updateContent= (e) => {
		setContent(e.target.value);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (
		<div className='new-poll-container'>
			<form onSubmit={onSignUp}>
				<div className='errors-container'>
					{errors.map((error, ind) => (
						<div className="errors" key={ind}>{error}</div>
					))}
				</div>
					<textarea
						className='question-input'
						placeholder='   Should I...'
						type='text'
						name='question'
						onChange={updateQuestion}
						value={question}
						required={true}></textarea>
          <div className="option-container">
					  <input
					  	className='form-input'
					  	placeholder=' Option 1'
					  	type='text'
					  	name='firstName'
					  	onChange={updateFirstName}
					  	value={firstName}
					  	required></input>
            </div>
				<div className='form-label__container'>
					<input
						className='form-input'
						placeholder=' Last Name'
						type='text'
						name='lastName'
						onChange={updateLastName}
						value={lastName}
						required></input>
				</div>
				<div className='form-label__container'>
					<input
						className='form-input'
						placeholder=' Birth Date'
						type='text'
						name='birthDate'
						onChange={updateBirthDate}
						value={birthDate}
						required={true}></input>
				</div>
				<div className='form-label__container'>
					<input
						className='form-input'
						placeholder=' Image URL'
						type='text'
						name='imgUrl'
						onChange={updateImgUrl}
						value={imgUrl}
						required={false}></input>
				</div>
				<div className='form-label__container'>
					<select
						className='form-input'
						value={gender}
						onChange={updateGender}
						required={true}>
						<option value=''>--Select gender--</option>
						<option value='Male'>Male</option>
						<option value='Female'>Female</option>
						<option value='Prefer not to answer'>
							Prefer not to answer
						</option>
					</select>
				</div>
				<div className='form-label__container'>
					<input
						className='form-input'
						type='password'
						name='password'
						onChange={updatePassword}
						value={password}
						required={true}
						placeholder=' Password'></input>
				</div>
				<div className='form-label__container'>
					<input
						className='form-input'
						type='password'
						name='repeat_password'
						onChange={updateRepeatPassword}
						value={repeatPassword}
						required={true}
						placeholder=' Confirm Password'></input>
				</div>
				<div className='form-button__container'>
					<button className='user-signup-button' type='submit'>
						Sign Up
					</button>
				</div>
				<div className="demo-login-container">
					<p className="demo-text">To demo TableTalk, <a className="demo-click-here" onClick={demoLogin}>Click Here</a></p>
				</div>
			</form>
		</div>
	);
};

export default CreatePollForm;
