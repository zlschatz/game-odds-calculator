import React, { Component } from 'react';
import './App.css';

class Odds extends Component {

	render() {
	  return (
	    <div>American Odds: 
	      <input 
		    type="text" 
		    placeholder={this.props.odds}
		    onKeyPress={this.props.onKeyPress}
	      />
	    </div>
	  );
	}
}

class Calculator extends Component {
	constructor(props) {
		super(props);

		this.state = {
		  odds: 0,
		  bet: 0,
		  win: 0
		}
	}

	setValue = (key) => {
	    return (this.state.odds === 0) ? key : this.state.odds + key;
	}

	handleKeyPress = (event) => {
		var val = this.setValue(event.key);
	    this.setState({ odds: val }, function () {
             // do math for odds
        });
	}

	render() {
	return (
	<div>
		<Odds odds={this.state.odds} onKeyPress={(event) => this.handleKeyPress(event)}/>
		{/*<div>Decimal Odds: <input type="text" /></div>
		<div>Fractional Odds: <input type="text" /></div>
		<div>Implied Odds: <input type="text" /></div>*/}
		<div>Bet Amount ($): <input type="text" /></div>
		<div>To Win ($): <input type="text" /></div>
		<div>Payout ($): <input type="text" /></div>
	</div>
	);
	}
}

export default Calculator;
