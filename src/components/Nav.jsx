import React from "react";
import piggy from "../assets/porco.png";

const Nav = () => {
	return (
		<div className="navWrapper">
			<span className="headerText">HogWild</span>
			<div className="TwirlyPig">
				<img src={piggy} className="App-logo" alt="piggy" />
			</div>
			<span className="normalText">
				A React app for county fair pig fans
			</span>
		</div>
	);
};

export default Nav;
