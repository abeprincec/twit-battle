import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
// import Message from "./Message.jsx";
class BattleScreen extends Component {
			constructor(props) {
		super(props);
		this.state = {
			matchInfo: this.props.content
		};
	}
    onNavigateHome() {
        BrowserRouter.push("/");
    }

	render() {
		let matchInfo=this.state.matchInfo;
		return <div>{matchInfo.blue_name}TEST!
                <h3>RED VS BLUE!</h3>
{/*                <p>User ID: {this.props.params.id}</p>*/}
                <button onClick={this.onNavigateHome} className="btn btn-primary">Go Home!</button>
            </div>;
	}
}

export default BattleScreen;
