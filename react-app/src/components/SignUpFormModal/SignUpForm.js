import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';

const SignUpForm = ({setShowModal}) => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('')
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(
				signUp(
					email,
					username,
          profilePic,
					password
				)
			);
			if (data) {
				setErrors(data);
			}
			if (user) {
				setShowModal(false)
			}
		};

	};

	const demoLogin = async (e) => {
		e.preventDefault()
    const user = await dispatch(login('demo@user.com','password'))
		if (user) {
			setShowModal(false)
		}
  }

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateProfilePic= (e) => {
		setProfilePic(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (
		<div className='form_container'>
			<form onSubmit={onSignUp}>
				<div className='errors-container'>
					{errors.map((error, ind) => (
						<div className="errors" key={ind}>{error}</div>
					))}
				</div>
				<div className='form-input-container'>
					<input
						className='form-input'
						placeholder=' Email Address'
						type='text'
						name='email'
						onChange={updateEmail}
						value={email}
						required={true}></input>
				</div>
				<div className='form-input-container'>
					<input
						className='form-input'
						placeholder=' Username'
						type='text'
						name='username'
						onChange={updateUsername}
						value={username}
						required></input>
				</div>
				<div className='form-input-container'>
					<input
						className='form-input'
						placeholder=' Profile Pic Img URL'
						type='text'
						name='profilePic'
						onChange={updateProfilePic}
						value={profilePic}
						required></input>
				</div>
				<div className='form-input-container'>
					<input
						className='form-input'
						type='password'
						name='password'
						onChange={updatePassword}
						value={password}
						required={true}
						placeholder=' Password'></input>
				</div>
				<div className='form-input-container'>
					<input
						className='form-input'
						type='password'
						name='repeat_password'
						onChange={updateRepeatPassword}
						value={repeatPassword}
						required={true}
						placeholder=' Confirm Password'></input>
				</div>
				<div className='form-button-container'>
					<button className='user-signup-button' type='submit'>
						Sign Up
					</button>
				</div>
				<div className="demo-login-container">
					<p className="demo-text">Should I try it out? <a className="demo-click-here" onClick={demoLogin}>Click Here</a></p>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
