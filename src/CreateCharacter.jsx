import React, { Component } from 'react';
// import Message from "./Message.jsx";

class CreateCharacter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newName: '',
			twitterName: '',
			charAttr: '',
		};
		this.handleTwitNameChange = this.handleTwitNameChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({ newName: event.target.value, charAttr: 'O' });
	}
	handleTwitNameChange(event) {
		this.setState({ twitterName: event.target.value, charAttr: 'T' });
	}
	handleEnterPressed = event => {
		event.preventDefault();
		if (event.key === 'Enter') {
			this.props.postChartoDB(event.target.value, this.state.charAttr);
			// $.ajax({
			// 	url: '/api/NewChar',
			// 	method: 'POST',
			// 	data: {
			// 		character: event.target.value,
			// 		select: this.state.charAttr,
			// 	},
			// 	success: console.log(this.state.charAttr, 'post success'),
			// });
			this.setState({
				newName: '',
				twitterName: '',
			});
		}
	};
	componentDidMount() {}
	render() {
		return (
			<div>
				<h2>new characters all goes in here</h2>
				<input
					className=""
					value={this.state.twitterName}
					onChange={this.handleTwitNameChange}
					onKeyUp={this.handleEnterPressed}
					placeholder="Enter that person's twitter handle"
				/>
				<br />
				<input
					className=""
					value={this.state.newName}
					onChange={this.handleChange}
					onKeyUp={this.handleEnterPressed}
					placeholder="Enter New Character's name"
				/>
			</div>
		);
	}
}

export default CreateCharacter;
