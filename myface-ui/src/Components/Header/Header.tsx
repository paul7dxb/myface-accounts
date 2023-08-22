import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { LoginContext } from "../LoginManager/LoginManager";

export function Header(): JSX.Element {
	const loginContext = useContext(LoginContext);

	return (
		<header className="header">
			<NavLink className="home-link" to="/">
				MyFace
			</NavLink>
			<p>{loginContext.isAdmin ? "logged in as admin" : ""}</p>
		</header>
	);
}

export function Nav(): JSX.Element {
	return (
		<nav className="nav">
			<NavLink className="nav-link" to="/">
				Feed
			</NavLink>
			<NavLink className="nav-link" to="/users">
				Users
			</NavLink>
		</nav>
	);
}
