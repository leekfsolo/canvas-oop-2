import { Component } from "react";
import classes from "./Button.module.css";

class Button extends Component {
	render() {
		const defaultOnClick = () => {

		};

		const btnType = `btn-${this.props.title}`;
		const btnClass = classes.btn + " " + classes[btnType];

		return (
			<button
				className={btnClass}
				onClick={this.props.onClick ? this.props.onClick : defaultOnClick}
				title={this.props.title ? this.props.title : ""}
			>
				{this.props.children}
			</button>
		);
	}
};

export default Button;