import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../slices/login/auth";
import { clearMessage } from "../../slices/error/message";
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Register = () => {
	const [successful, setSuccessful] = useState(false);

	const { message } = useSelector((state) => state.message);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch]);

	const initialValues = {
		username: "",
		email: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.test(
				"len",
				"The username must be between 3 and 20 characters.",
				(val) =>
					val &&
					val.toString().length >= 3 &&
					val.toString().length <= 20
			)
			.required("This field is required!"),
		email: Yup.string()
			.email("This is not a valid email.")
			.required("This field is required!"),
		password: Yup.string()
			.test(
				"len",
				"The password must be between 6 and 40 characters.",
				(val) =>
					val &&
					val.toString().length >= 6 &&
					val.toString().length <= 40
			)
			.required("This field is required!"),
		/*confirmpassword: Yup.string().test("same", "password and confirm password doesnt match.",
		  (val) =>
		   val && val.toString().match(password),
		).ensure("Password and Confirm Password should match!"),*/
	});

	const handleRegister = (formValue) => {
		const { username, email, password } = formValue;
		setSuccessful(false);
		dispatch(register({ username, email, password }))
			.unwrap()
			.then(() => {
				setSuccessful(true);
			})
			.catch((error) => {
				setSuccessful(false);
				console.log(error);
				if (error.response) {
					setErrorHandler({
						hasError: true,
						message: error.response.data.message,
					});
				}
			});
	};

	const [errorHandler, setErrorHandler] = useState({
		hasError: false,
		message: "",
	});

	return (
		<div>
			<Header errorHandler={errorHandler}></Header>
			<div className="sign-in-main">
				<div className="container d-flex">
					<div className="sign-in-container py-5 m-auto border">
						<div className="sign-in-header">
							<h4 className="font-weight-bold">Sign Up</h4>
							<p className="sign-in-intro">
								<span className="text-muted">New to FanatiQA ? </span>
								<a href="/login"><span className="text-danger font-weight-bold">Sign In</span></a>
							</p>
							<div className="login-social-media py-3">
								<button className="btn btn-primary btn-block btn-sm">
									Continue with Google
                </button>
							</div>
						</div>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleRegister}
						>
							<Form>
								{!successful && (
									<div>
										<div className="form-group">
											<label htmlFor="username">Username</label>
											<Field name="username" type="text" className="form-control" />
											<ErrorMessage
												name="username"
												component="div"
												className="alert alert-danger"
											/>
										</div>

										<div className="form-group">
											<label htmlFor="email">Email</label>
											<Field name="email" type="email" className="form-control" />
											<ErrorMessage
												name="email"
												component="div"
												className="alert alert-danger"
											/>
										</div>

										<div className="form-group">
											<label htmlFor="password">Password</label>
											<Field
												name="password"
												type="password"
												className="form-control"
											/>
											<ErrorMessage
												name="password"
												component="div"
												className="alert alert-danger"
											/>
										</div>

										<div className="form-group">
											<label htmlFor="password">Confirm Password</label>
											<Field
												name="confirmpassword"
												type="confirmpassword"
												className="form-control"
											/>
											<ErrorMessage
												name="confirmpassword"
												component="div"
												className="alert alert-danger"
											/>
										</div>

										<div className="form-group">
											<button type="submit" className="btn btn-primary btn-block">Sign Up</button>
										</div>
									</div>
								)}
							</Form>
						</Formik>
					</div>
				</div>
				{message && (
					<div className="form-group">
						<div
							className={successful ? "alert alert-success" : "alert alert-danger"}
							role="alert"
						>
							{message}
						</div>
					</div>
				)}
			</div>
			<Footer></Footer>
		</div>
	);
};

export default Register;







/*import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../slices/login/login";
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const RegisterCustomerUser = () => {
  const initialUserState = {
	id: null,
	inputemail: "",
	password: "",
	confirmpassword:"",
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const [errorHandler, setErrorHandler] = useState({
	hasError: false,
	message: "",
  });

  const dispatch = useDispatch();


  const handleInputChange = event => {
	const { name, value } = event.target;
	console.log ("handleInputChange: " , event.target);
	console.log(name, value);
	console.log("handleInputChange : before value being set : " , user );
	setUser({ ...user, [name]: value });
	console.log("handleInputChange : After value being set : " , user );
  };

  const RegisterAuthAction = () => {
	const {  inputemail, password, confirmpassword} = user;

	dispatch(registerUser({ inputemail, password, confirmpassword }))
	  .unwrap()
	  .then(data => {
		console.log("Save Project : " , data);
		setUser({
		  inputemail: data.inputemail,
		  password: data.password,
		  confirmpassword: data.confirmpassword * 1,  // converting string to number
		});
		setSubmitted(true);
	  })
	  .catch(error => {
		console.log(error);
		if (error.response) {
		setErrorHandler({
		  hasError: true,
		  message: error.response.data.message,
		});
	  }
	  });
  };

  // const newUser = () => {
  //   setUser(RegisterCustomerUser);
  //   setSubmitted(false);
  // };

  return (
	<div>
	  <Header errorHandler={errorHandler}></Header>
	  <div className="sign-in-main">
		<div className="container d-flex">
		  <div className="sign-in-container py-5 m-auto border">
			<div className="sign-in-header">
			  <h4 className="font-weight-bold">Sign Up</h4>
			  <p className="sign-in-intro">
				<span className="text-muted">New to FanatiQA ? </span>
				<span className="text-danger font-weight-bold">Sign In</span>
			  </p>
			  <div className="login-social-media py-3">
				<button className="btn btn-primary btn-block btn-sm">
				  Continue with Google
				</button>
			  </div>
			</div>
			<form>
			  <div className="form-group">
				<div className="form-row">
				  <div className="col">
					<label htmlFor="InputEmail">Email addres</label>
					<input
			  type="text"
			  className="form-control"
			  id="InputEmail"
			  required
			  value={user.inputEmail || ''}
			  onChange={handleInputChange}
			  name="InputEmail"
			/>
				  </div>
				</div>
				<small id="emailHelp" className="form-text text-muted">
				  We'll never share your email with anyone else.
				</small>
			  </div>
			  <div className="form-group">
				<label htmlFor="InputPassword1">Password</label>
				<input
				  type="password"
				  className="form-control form-control-sm"
				  id="password"
			  required
			  value={user.password || ''}
			  onChange={handleInputChange}
			  name="password"
				/>
			  </div>

			  <div className="form-group">
				<label htmlFor="InputPassword1">Confirm Password</label>
				<input
				  type="confirmpassword"
				  className="form-control form-control-sm"
				  id="confirmpassword"
			  required
			  value={user.confirmpassword || ''}
			  onChange={handleInputChange}
			  name="confirmpassword"
				/>
			  </div>
			  <button type="submit" onChange={RegisterAuthAction} className="btn btn-danger btn-sm">
				Submit
			  </button>
			</form>
		  </div>
		</div>
	  </div>
	  <Footer></Footer>
	</div>
  );
};
export default RegisterCustomerUser;
*/