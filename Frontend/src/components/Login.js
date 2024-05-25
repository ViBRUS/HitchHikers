import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Canvas from "./Canvas";
import services from "../common/services";
import AuthContext from '../context/AuthProvider';
import { toast, Bounce, ToastContainer } from 'react-toastify';
//import '../css/login-page.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
	const { auth, setAuth, persist } = useContext(AuthContext);

	const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

	const userRef = useRef();
	const errRef = useRef();
	let firstLoad = true;

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
		const token = localStorage.getItem('authToken');
		const user = localStorage.getItem('authUser');
		const name = localStorage.getItem('authName');
    	if (token && user && name) {
			setAuth({ user, token, name });
		}
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [existingUser, existingPswd]);

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			const registerPayload = {
				name: userName,
				email: email,
				password: password,
				mobile: phone
			}
            services.registerUser(registerPayload).then(response => {
				if(response?.success) {
					localStorage.setItem('authToken', response.user.token);
					localStorage.setItem('authUser', response.user.email);
					localStorage.setItem('authName', response.user.name);
					setUserName('');
					setEmail('');
					setPassword('');
					setPhone('');
					toast.success('Registered successfully! Please login.', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
					setSuccess(true);
					navigate(from, { replace: true });
				}
			})
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
	}

	const handleLogIn = async (e) => {
		e.preventDefault();

		try {
			const payload = {
				email: existingUser,
				password: existingPswd
			}
			services.loginUser(payload).then(response => {
				if (response?.success) {
					const mail = response.user.email;
					const name = response.user.name;
					const token = response.user.token;
					setAuth({ mail, token, name });
					if (localStorage.getItem('authToken')) {
						localStorage.clear();
					}
					localStorage.setItem('authToken', token);
					localStorage.setItem('authUser', mail);
					localStorage.setItem('authName', name);
					setExistingUser('');
					setExistingPswd('');
					toast.success('Welcome!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
					setSuccess(true);
					navigate(from, { replace: true });
				}
			});

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
		}
	}

	useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

	useEffect(() => {
		if (auth.token && firstLoad) {
			navigate(from, { replace: true });
			firstLoad = true;
		}
	}, [auth.token]);

	return (
		<div className="login-page">
			<Canvas />
			<ToastContainer />
			<div className="main">
				<input type="checkbox" id="chk" aria-hidden="true" />
				<div className="signup">
					<form onSubmit={handleSignUp}>
						<label for="chk" aria-hidden="true">Sign up</label>
						<input 
							type="text"
							id="name"
							placeholder="Name"
							ref={userRef}
							onChange={(e) => setUserName(e.target.value)}
							value={userName}
							required
						/>
						<input
							type="email"
							id="signUpEmail"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>
						<input
							type="text"
							id="phone"
							placeholder="Phone No."
							onChange={(e) => setPhone(e.target.value)}
							value={phone}
							required
						/>
						<input
							type="password"
							id="signUpPswd"
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
