import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import CreateCharacter from './CreateCharacter.jsx';
import CurrentBattle from './CurrentBattle.jsx';
import SelectableCharacters from './SelectableCharacters.jsx';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const Home = () => (
	<div>
		<h2>Homes</h2>
	</div>
);

// const Character = ({ match }) => (
// 	<div>
// 		<h3>{match.params.charId}</h3>
// 	</div>
// );

// const AllCharacter = ({ match }) => (
// 	<div>
// 		<h2>Every character is displayed here</h2>
// 		<ul>
// 			<li>
// 				<Link to={`${match.url}/Char1`}>Char1</Link>
// 			</li>
// 			<li>
// 				<Link to={`${match.url}/Char2`}>Char2</Link>
// 			</li>
// 			<li>
// 				<Link to={`${match.url}/Char3`}>Char3</Link>
// 			</li>
// 		</ul>
// 		<Route path="/AllChar/:charId" component={Character} />
// 		<Route
// 			exact
// 			path={match.url}
// 			render={() => <h3>please select a Character</h3>}
// 		/>
// 	</div>
// );
//do not delete the comments.
class App extends Component {
	constructor() {
		super();
		this.state = {
			message: '',
			charNames: [],
		};
		this.postBattletoDB = this.postBattletoDB.bind(this);
		this.postChartoDB = this.postChartoDB.bind(this);
		// this.handleClickCard=this.handleClickCard.bind(this);
	}

	getData = () => {
		$.get('/api/message', data => {
			this.setState({
				message: data[0].name,
				charNames: data,
			});
		});
	};

	componentDidMount() {
		// fetch('/api/message')
		//   .then(response => response.json())
		//   .then(json => this.setState({ message: json[0].name }));
		this.getData();
	}
postBattletoDB(team_Red,team_Blue){
		fetch('/api/CurBattle', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			//make sure to serialize your JSON body
			body: JSON.stringify({
				teamRed: team_Red,
				teamBlue: team_Blue
			}),
		})
}
	postChartoDB(charName, charAttr) {
		// $.ajax({
		// 	url: '/api/NewChar',
		// 	method: 'POST',
		// 	data: {
		// 		character: charName,
		// 		select: charAttr,
		// 	},
		// 	success: console.log(charAttr, 'post success'),
		// });
		fetch('/api/NewChar', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},

			//make sure to serialize your JSON body
			body: JSON.stringify({
				character: charName,
				select: charAttr,
			}),
		}).then(response => {
			this.getData();
			console.log(response);
		});
	}

	render() {
		let charNames = this.state.charNames;
		return (
			<div className="App">
				<Router>
					<div>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/NewChar">Create Character</Link>
						</li>
						<li>
							<Link to="/AllChar">All Characters</Link>
						</li>
						<li>
							<Link to="/CurBattle">Show Current Battle</Link>
						</li>
						<Route exact path="/" component={Home} />
						<Route
							exact
							path="/NewChar"
							render={() => (
								<CreateCharacter
									content={this.state.message}
									postChartoDB={this.postChartoDB}
								/>
							)}
						/>
						<Route exact path="/AllChar" 
							render={() => (
								<SelectableCharacters
								content={charNames}
							  postBattletoDB={this.postBattletoDB}
								/>
								)}
							/>
						<Route exact path="/CurBattle" component={CurrentBattle} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
