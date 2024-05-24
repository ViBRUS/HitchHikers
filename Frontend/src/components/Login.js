import React, { useRef, useState, useEffect, useContext } from "react";
import Canvas from "./Canvas";
import services from "../common/services";
import AuthContext from "../context/AuthProvider";
import '../css/login-page.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	// Signup
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

	const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


	// Login
	const [existingUser, setExistingUser] = useState('');
	const [existingPswd, setExistingPswd] = useState('');

	useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [existingUser, existingPswd])


	const handleLogIn = async (e) => {
		e.preventDefault();
		console.log(e);

		try {
			const response = await services.loginUser(existingUser, existingPswd).then(response => {
				setAuth({ existingUser, existingPswd });
            	setExistingUser('');
            	setExistingPswd('');
            	setSuccess(true);
			});
			console.log(JSON.stringify(response?.data));
		} catch (err) {
			if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // errRef.current.focus();
		}
	}

	return (
		<div className="login-page">
			<Canvas />
			<div className="main">
				<input type="checkbox" id="chk" aria-hidden="true" />
				<div className="signup">
					<form>
						<label for="chk" aria-hidden="true">Sign up</label>
						<input 
							type="text"
							id="userName"
							placeholder="User name"
							ref={userRef}
							onChange={(e) => setUserName(e.target.value)}
							value={userName}
							required
						/>
						<input
							type="email"
							id="email"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>
						<input
							type="number"
							id="phone"
							placeholder="Phone No."
							onChange={(e) => setPhone(e.target.value)}
							value={phone}
							required
						/>
						<input
							type="password"
							id="pswd"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
						<button>Sign up</button>
					</form>
				</div>

				<div className="login">
				<form onSubmit={handleLogIn}>
					<label for="chk" aria-hidden="true">Login</label>
					<input
						type="email"
						id="email"
						placeholder="Email"
						onChange={(e) => setExistingUser(e.target.value)}
						value={existingUser}
						required
					/>
					<input
						type="password"
						name="pswd"
						placeholder="Password"
						onChange={(e) => setExistingPswd(e.target.value)}
						value={existingPswd}
						required
					/>
					<button>Login</button>
				</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
