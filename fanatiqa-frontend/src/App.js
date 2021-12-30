import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/board/Home";
import Profile from "./components/board/Profile";
import BoardUser from "./components/board/BoardUser";
import BoardModerator from "./components/board/BoardModerator";
import BoardAdmin from "./components/board/BoardAdmin";
import TreeList from "./pages/TreeList/index";
import { logout } from "./slices/login/auth";
import EventBus from "./common/EventBus";
import { useTranslation } from 'react-i18next';

const App = () => {
	const { t } = useTranslation();
	//{t('home')} example for using transalation object for getting values using key from language file
	const [showModeratorBoard, setShowModeratorBoard] = useState(false);
	const [showAdminBoard, setShowAdminBoard] = useState(false);
	const { isLoggedIn } = useSelector((state) => state.auth);

	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const logOut = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	useEffect(() => {
		if (currentUser) {
			setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
			setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
		} else {
			setShowModeratorBoard(false);
			setShowAdminBoard(false);
		}

		EventBus.on("logout", () => {
			logOut();
		});

		return () => {
			EventBus.remove("logout");
		};
	}, [currentUser, logOut]);

	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<Link to={"/"} className="navbar-brand">
						{t ('companyname')}
                    </Link>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={"/home"} className="nav-link">
								{t('home')}
                            </Link>
						</li>
						
						{showModeratorBoard && (
							<li className="nav-item">
								<Link to={"/mod"} className="nav-link">
									{t('Moderator-board')}
                                </Link>
							</li>
						)}
						{showAdminBoard && (
							<li className="nav-item">
								<Link to={"/admin"} className="nav-link">
									{t('Admin-board')}
                                </Link>
							</li>
						)}

						{currentUser && (
							<li className="nav-item">
								<Link to={"/user"} className="nav-link">
									{t('User')}
                                </Link>
							</li>
						)}
					</div>
					{currentUser ? (
						<div className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to={"/profile"} className="nav-link">
									{currentUser.username}
								</Link>
							</li>
							<li className="nav-item">
								<a href="/login" className="nav-link" onClick={logOut}>
									{t('logout')}
                                </a>
							</li>
						</div>
					) : (
							<div className="navbar-nav ml-auto">
								<li className="nav-item">
									<Link to={"/login"} className="nav-link">
										{t('login')}
                                    </Link>
								</li>

								<li className="nav-item">
									<Link to={"/register"} className="nav-link">
										{t('signup')}
                                    </Link>
								</li>

								<li className="nav-item">
									<Link to={"/treeview"} className="nav-link">
										{t('tree-view')}
                                    </Link>
								</li>
							</div>
						)}
				</nav>
				<div className="container mt-3">
					<Switch>
						<Route exact path={["/", "/home"]} component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/profile" component={Profile} />
						<Route path="/user" component={BoardUser} />
						<Route path="/mod" component={BoardModerator} />
						<Route path="/admin" component={BoardAdmin} />
						<Route path="/treeview" component={TreeList} />
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
