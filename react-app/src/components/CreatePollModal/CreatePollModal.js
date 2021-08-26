// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { signUp } from '../../store/session';
// import { login } from '../../store/session';

// const CreatePollForm = ({setShowModal}) => {
// 	const [errors, setErrors] = useState([]);
// 	const [question, setQuestion] = useState('');
//   const [option, setOption] = useState('');
// 	const user = useSelector((state) => state.session.user);
// 	const dispatch = useDispatch();

// 	const onCreate = async (e) => {
// 		e.preventDefault();
// 			const data = await dispatch(
// 				createOnePoll(
// 					email,
// 					firstName,
// 					lastName,
// 					birthDate,
// 					imgUrl,
// 					gender,
// 					password
// 				)
// 			);
// 			if (data) {
// 				setErrors(data);
// 			}
// 			if (user) {
// 				setShowModal(false)
// 			}
// 		};

// 	};


// 	const updateRepeatPassword = (e) => {
// 		setRepeatPassword(e.target.value);
// 	};

// 	if (user) {
// 		return <Redirect to='/' />;
// 	}

// 	return (
// 		<div className='form_container'>
// 			<form onSubmit={onSignUp}>
// 				<div className='errors-container'>
// 					{errors.map((error, ind) => (
// 						<div className="errors" key={ind}>{error}</div>
// 					))}
// 				</div>
// 				<div className='form-label__container'>
// 					<input
// 						className='form-input'
// 						placeholder=' Email Address'
// 						type='text'
// 						name='email'
// 						onChange={updateEmail}
// 						value={email}
// 						required={true}></input>
// 				</div>
// 				<div className='form-label__container'>
// 					<input
// 						className='form-input'
// 						placeholder=' First Name'
// 						type='text'
// 						name='firstName'
// 						onChange={updateFirstName}
// 						value={firstName}
// 						required></input>
// 				</div>
// 				<div className='form-label__container'>
// 					<input
// 						className='form-input'
// 						placeholder=' Last Name'
// 						type='text'
// 						name='lastName'
// 						onChange={updateLastName}
// 						value={lastName}
// 						required></input>
// 				</div>
// 				<div className='form-label__container'>
// 					<input
// 						className='form-input'
// 						placeholder=' Birth Date'
// 						type='text'
// 						name='birthDate'
// 						onChange={updateBirthDate}
// 						value={birthDate}
// 						required={true}></input>
// 				</div>
// 				<div className='form-label__container'>
// 					<input
// 						className='form-input'
// 						placeholder=' Image URL'
// 						type='text'
// 						name='imgUrl'
// 						onChange={updateImgUrl}
// 						value={imgUrl}
// 						required={false}></input>
// 				</div>
// 				<div className='form-label__container'>
// 					<select
// 						className='form-input'
// 						value={gender}
// 						onChange={updateGender}
// 						required={true}>
// 						<option value=''>--Select gender--</option>
// 						<option value='Male'>Male</option>
// 						<option value='Female'>Female</option>
// 						<option value='Prefer not to answer'>
// 							Prefer not to answer
// 						</option>
// 					</select>
// 				</div>
// 				<div className='form-label__container'>
// 					<input
// 						className='form-input'
// 						type='password'
// 						name='password'
// 						onChange={updatePassword}
// 						value={password}
// 						required={true}
// 						placeholder=' Password'></input>
// 				</div>
// 				<div className='form-label__container'>
// 					<input
// 						className='form-input'
// 						type='password'
// 						name='repeat_password'
// 						onChange={updateRepeatPassword}
// 						value={repeatPassword}
// 						required={true}
// 						placeholder=' Confirm Password'></input>
// 				</div>
// 				<div className='form-button__container'>
// 					<button className='user-signup-button' type='submit'>
// 						Sign Up
// 					</button>
// 				</div>
// 				<div className="demo-login-container">
// 					<p className="demo-text">To demo TableTalk, <a className="demo-click-here" onClick={demoLogin}>Click Here</a></p>
// 				</div>
// 			</form>
// 		</div>
// 	);
// };

// export default CreatePollForm;
