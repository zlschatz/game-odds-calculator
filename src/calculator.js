import React, { Component } from 'react';
import './App.css';

class Calculator extends Component {

  render() {
    return (
	<div>
    	<div>American Odds: <input type="text" /></div>
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
