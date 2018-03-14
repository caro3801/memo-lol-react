/**
 * Created by caroline on 12/03/2018.
 */
import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./card.css";

class Card extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let flipped = "notflipped";
		if(this.props.flipped){
			flipped = "flipped";
		}
		return (
			<div id={this.props.id} className="col-lg-3 col-md-4 col-xs-6 thumb flip" onClick={this.props.onClick} >
				<div className={"card thumbnail " + flipped} >
					<div className="face front">
						<img className="card-img-top"
							 src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img}
							 alt="Card  cap"/>
						<div className="card-body">
							<p className="card-text">{this.props.name}</p>
						</div>
					</div>
					<div className="face back">
						<img className="card-img-top" src="back.jpg" alt="Card  cap"/>
						<div className="card-body">
							<p className="card-text">Click me</p>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default Card;
