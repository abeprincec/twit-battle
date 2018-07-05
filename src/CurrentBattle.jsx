import React, { Component } from 'react';
import $ from 'jquery';
// import Message from "./Message.jsx";
import './App.css';
import ActiveMatch from './ActiveMatch.jsx'

class CurrentBattle extends Component {
	constructor(props) {
		super(props);
		this.state = {
		data: []
		};
	}
		getData = () => {
		$.get('/api/CurBattle', data => {
			this.parseBattle(data);
		});
	};
	componentDidMount() {
		// fetch('/api/message')
		//   .then(response => response.json())
		//   .then(json => this.setState({ message: json[0].name }));
	this.getData();
}


parseBattle=(x) =>{
//zach's code great help!
let battleObj = {}
	x.forEach((battle) => {
  // if battle doesn't already exist
  if (!battleObj[battle.BATTLEID]) {
    // add to battle object
    battleObj[battle.BATTLEID] = {
      BATTLEID: battle.BATTLEID
    }
  }
  if (battle.id === battle.red_side_id_fk) {
    battleObj[battle.BATTLEID].red_name = battle.name;
    battleObj[battle.BATTLEID].red_hp=battle.hp;
    battleObj[battle.BATTLEID].red_attack=battle.attack;
  } else if(battle.id === battle.blue_side_id_fk){
    battleObj[battle.BATTLEID].blue_name = battle.name;
    battleObj[battle.BATTLEID].blue_hp = battle.hp;
    battleObj[battle.BATTLEID].blue_attack = battle.attack;
  }

})
	this.setState({
		data: Object.values(battleObj)
		});
}

	render() {
	let activematch= this.state.data;
	// console.log(this.props.matchInfo,"is matchinfo defined in currentbattle?")
	return (
	<div>
		<h3>CurrentBattles are displayed here</h3>
			{activematch.map(x => <ActiveMatch match={x} key={x.BATTLEID} matchInfo={this.props.matchInfo}/>)}
	</div>);
	}
}
export default CurrentBattle;