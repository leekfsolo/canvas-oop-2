import { Component } from "react";
import classes from "./Navbar.module.css";

class Navbar extends Component {
	render() {
		return (
			<nav className={classes.navbar}>
				{this.props.children}
			</nav>
		);
	}
}

export default Navbar;