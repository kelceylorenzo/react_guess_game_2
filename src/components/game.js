import React, { Component } from 'react';
import History from './history';
import '../assets/css/game.css';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userNumber: '',
			message: 'Make a guess',
			shake: false,
			guesses: 0,
			lowScore: localStorage.getItem('score') || 'Not Set',
			history: []
		};

		this.randomNumber = null;
		this.status = 'playable';

		this.resetGame = this.resetGame.bind(this);
		this.makeGuess = this.makeGuess.bind(this);
	}

	componentDidMount() {
		this.generateRandomNumber();
	}

	generateRandomNumber() {
		this.randomNumber = Math.floor(Math.random() * 10) + 1;
	}

	resetGame() {
		this.status = 'playable';

		this.generateRandomNumber();
		this.setState({
			userNumber: '',
			message: 'Make a guess',
			shake: false,
			guesses: 0,
			history: []
		});
	}

	makeGuess(event) {
		event.preventDefault();
		if (this.status === 'won') {
			return;
		}

		const { userNumber, guesses, history } = this.state;
		let message = '';

		if (this.randomNumber < userNumber) {
			message = 'Too High';
		} else if (this.randomNumber > userNumber) {
			message = 'Too Low';
		} else {
			message = 'Correct!';
			this.status = 'won';
		}

		this.setState(
			{
				message: message,
				userNumber: '',
				shake: true,
				guesses: guesses + 1,
				history: [`${userNumber} | ${message}`, ...history]
			},
			() => {
				if (this.status === 'won') {
					this.checkHighScore();
				}
			}
		);

		setTimeout(() => {
			this.setState({
				shake: false
			});
		}, 200);
	}

	checkHighScore() {
		const lowScore = localStorage.getItem('score');
		const { guesses } = this.state;

		if (lowScore) {
			if (guesses < lowScore) {
				localStorage.setItem('score', guesses);
			}
		} else {
			localStorage.setItem('score', guesses);
		}
		this.setState({
			lowScore: localStorage.getItem('score')
		});
	}

	render() {
		const buttonStyle = {
			margin: '10px 5px'
		};

		const { userNumber, message, shake, guesses, lowScore, history } = this.state;

		return (
			<div>
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
				<p className="center-align">
					Number of guesses: {guesses} | Personal best: {lowScore}
				</p>
				<h3 className={`center-align ${shake ? 'shake' : ''}`}>{message}</h3>
				<History data={history} />
			</div>
		);
	}
}

export default Game;
