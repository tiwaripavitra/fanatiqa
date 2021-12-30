/*import React, { useState } from "react";
import { useHistory } from "react-router";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useDispatch } from "react-redux";
import { loginUser } from "../../slices/login/login";*/
import { BrowserRouter as Link } from "react-router-dom";

import Footer from "../layout/Footer";
import Header from "../layout/Header";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../slices/login/auth";
import { clearMessage } from "../../slices/error/message";

const Login = (props) => {

	const [loading, setLoading] = useState(false);
	const [errorHandler, setErrorHandler] = useState({
		hasError: false,
		message: "",
	});

	const { isLoggedIn } = useSelector((state) => state.auth);
	const { message } = useSelector((state) => state.message);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch]);

	const initialValues = {
		username: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string().required("This field is required!"),
		password: Yup.string().required("This field is required!"),
	});

	const handleLogin = (formValue) => {
		const { username, password } = formValue;
		setLoading(true);

		dispatch(login({ username, password }))
			.unwrap()
			.then(() => {
				props.history.push("/profile");
				window.location.reload();
				
			})
			.catch(() => {
				setLoading(false);
			});
	};

	if (isLoggedIn) {
		return <Redirect to="/profile" />;
	}

	return (
		<div>
			<Header errorHandler={errorHandler} />
			<div className="sign-in-main">
				<div className="container d-flex">
					<div className="sign-in-container py-5 m-auto border">
						<div className="sign-in-header">
							<h4 className="font-weight-bold">Login</h4>
							<p className="sign-in-intro">
								<span className="text-muted">New to FanatiQA ? </span>
								<Link to={"/register"} className="nav-link">
									<a href="/register"><span className="text-danger font-weight-bold">Sign Up</span></a>
								</Link>
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
							onSubmit={handleLogin}
						>
							<Form>
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
									<label htmlFor="password">Password</label>
									<Field name="password" type="password" className="form-control" />
									<ErrorMessage
										name="password"
										component="div"
										className="alert alert-danger"
									/>
								</div>

								<div className="form-group">
									<button type="submit" className="btn btn-primary btn-block" disabled={loading}>
										{loading && (
											<span className="spinner-border spinner-border-sm"></span>
										)}
										<span>Login</span>
									</button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
			{message && (
				<div className="form-group">
					<div className="alert alert-danger" role="alert">
						{message}
					</div>
				</div>
			)}
			<Footer></Footer>
		</div>
	);
}

export default Login;
