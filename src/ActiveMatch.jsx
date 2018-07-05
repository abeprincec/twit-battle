import React, { Component } from 'react';
import './App.css';
import {Redirect } from 'react-router-dom';

// import Message from "./Message.jsx";
class ActiveMatch extends Component {
		constructor(props) {
		super(props);
		this.state = {
			active: false
			};
	}

		// fetch('/api/message')
		//   .then(response => response.json())
		//   .then(json => this.setState({ message: json[0].name }));

				// 	onClick={() => {
				// 		this.props.onClick(match);
				// 		this.setState(prevState => {
				// 		return {active: !prevState.active}
				// 	})
				// }}
	render() {
		const { match } = this.props;
		    if (this.state.active === true) {
	      return <Redirect to={"/CurBattle/"+match.BATTLEID} />
   				 }

		const style = this.state.active ? {
			backgroundColor: 'purple'
		} : {
			backgroundColor: 'red'
		}
		let profile = ( 
				<div
					onClick={() => {
					this.setState(prevState => {
					return {active: !prevState.active}
					})
				}}
			 	className="matchBorder"
				style={style}>
			<h4 className="matchRedSide">RED SIDE:{match.red_name}</h4>
			<h3 className="matchId">Match #{match.BATTLEID}</h3>
			<h4 className="matchBlueSide">BLUE SIDE:{match.blue_name}</h4>
			</div>
		);
		return profile;
	}
}

export default ActiveMatch;
