import React, { Component } from 'react';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			randomNumber: null
		};
		this.resetGame = this.resetGame.bind(this);
	}

	componentDidMount() {
		this.generateRandomNumber();
	}

	generateRandomNumber() {
		const randNum = Math.floor(Math.random() * 10) + 1;

		this.setState({
			...this.state,
			randomNumber: randNum
		});
	}

	resetGame() {
		this.generateRandomNumber();
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<p>Random Number: {this.state.randomNumber}</p>
				<button className="btn red darken-4" onClick={this.resetGame}>
					Reset
				</button>
			</div>
		);
	}
}

export default Game;
