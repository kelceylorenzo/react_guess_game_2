import React, { Component } from 'react';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			randomNumber: null,
			userNumber: ''
		};
		this.resetGame = this.resetGame.bind(this);
		this.makeGuess = this.makeGuess.bind(this);
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

	makeGuess(event) {
		event.preventDefault();
		console.log(this.state.userNumber);
	}

	render() {
		const buttonStyle = {
			margin: '10px 5px'
		};

		const { randomNumber, userNumber } = this.state;

		return (
			<div>
				<p>Random Number: {randomNumber}</p>
				<div className="row">
					<form className="col s6 offset-s3" onSubmit={this.makeGuess}>
						<div className="row">
							<div className="input-field">
								<input
									type="number"
									placeholder="Enter a number"
									value={userNumber}
									onChange={(event) => {
										this.setState({ userNumber: event.target.value });
									}}
									className="center-align"
								/>
							</div>
						</div>
						<div className="row center-align">
							<button className="btn green darken-2" style={buttonStyle}>
								Guess
							</button>
							<button
								type="button"
								className="btn red darken-4"
								style={buttonStyle}
								onClick={this.resetGame}
							>
								Reset
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Game;
