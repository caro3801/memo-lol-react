/**
 * Created by caroline on 12/03/2018.
 */
import React, {Component} from "react";
//import "./board.css";
import Card from "../card/Card";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

class Board extends Component {


	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			champions: [],
			secondCardFlipped: null,
			firstCardFlipped: null
		};

	}

	handleClick(cardPosition, event) {

		if (this.state.firstCardFlipped === null) {
			let champs = this.flipSelectedCard(cardPosition);
			this.setState({champions: champs, firstCardFlipped: cardPosition});
		} else if (this.state.secondCardFlipped === null && this.state.firstCardFlipped !== cardPosition) {
			let champs = this.flipSelectedCard(cardPosition);
			this.setState({champions: champs, secondCardFlipped: cardPosition});
			setTimeout(this.hideCardsWhenDifferent.bind(this), 1000);
		}

	};

	flipSelectedCard(cardPosition) {
		let flippedChampion = {
			...this.state.champions[cardPosition],
			flipped: !this.state.champions[cardPosition].flipped
		};
		let champs = this.state.champions;
		champs.splice(cardPosition, 1, flippedChampion);
		return champs;
	}

	hideCardsWhenDifferent() {
		let champs = this.state.champions;
		let firstChampion = this.state.champions[this.state.firstCardFlipped];
		let secondChampion = this.state.champions[this.state.secondCardFlipped];
		if (secondChampion.id !== firstChampion.id) {
			let flippedChampionCurr = {...secondChampion, flipped: !secondChampion.flipped};
			let flippedChampionPrev = {...firstChampion, flipped: !firstChampion.flipped};

			champs.splice(this.state.secondCardFlipped, 1, flippedChampionCurr);
			champs.splice(this.state.firstCardFlipped, 1, flippedChampionPrev);

		}

		this.setState({champions: champs, firstCardFlipped: null, secondCardFlipped: null});
	}

	/**
	 * Recupere un tableau de N champions choisis aleatoirement dans la liste des champions
	 * @param champs : liste des champions
	 * @param number : nombre de champions a recuperer
	 * @returns {Array}
	 */
	randomPick(champs, number) {
		let rChamps = [];
		for (let i = 0; i < (number / 2); i++) {

			let elem = champs.splice(Math.floor(Math.random() * champs.length), 1)[0];

			rChamps.push({"id": elem.key, "name": elem.name, "img": elem.key + "_0.jpg", flipped: true});
			rChamps.push({"id": elem.key, "name": elem.name, "img": elem.key + "_1.jpg", flipped: true});
		}

		return rChamps;
	}

	generateCards(champs) {
		let cards = [];
		for (let i = 0; i < champs.length; i++) {
			cards.push(
				<Card id={champs[i].id}
					  name={champs[i].name}
					  img={champs[i].img}
					  flipped={champs[i].flipped}
					  key={i}
					  onClick={this.handleClick.bind(this, i)}
				/>);
		}
		return cards;
	}


	shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}


	componentWillReceiveProps(nextProps) {
		fetch("champion.json")
			.then(res => res.json())
			.then(
				(result) => {
					let rChamps = this.randomPick(result, nextProps.number);
					let champions = this.shuffle(rChamps);
					this.setState({

						secondCardFlipped: null,
						firstCardFlipped: null,
						isLoaded: true,
						champions: champions
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);

	}

	componentDidMount() {
		fetch("champion.json")
			.then(res => res.json())
			.then(
				(result) => {
					let rChamps = this.randomPick(result, this.props.number);
					let champions = this.shuffle(rChamps);
					this.setState({
						isLoaded: true,
						champions: champions
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);

	}


	render() {

		const {error, isLoaded, champions} = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			let cards = this.generateCards(champions);
			return (
				<section className="row" classID="board">
					{cards}
				</section>
			);
		}
	}
}

export default Board;
