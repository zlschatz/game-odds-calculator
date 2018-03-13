import React, { Component } from 'react';
import './App.css';

class Odds extends Component {
	render() {
	  return (
	    <div>American Odds: 
	      <input 
		    type="text" 
		    placeholder="+110"
            value={(this.props.odds)}
		    onChange={this.props.onChange}
	      />
	    </div>
	  );
	}
}

class Bet extends Component {
    render() {
      return (
        <div>Bet Amount ($): 
          <input 
            type="text" 
            placeholder="100"
            value={(this.props.bet)}
            onChange={this.props.onChange}
          />
        </div>
      );
    }
}

class Win extends Component {
    render() {
      return (
        <div>To Win ($):
          <input 
            type="text"
            value={(this.props.win)}
            onChange={this.props.onChange}
          />
        </div>
      );
    }
}

class Payout extends Component {
	render() {
	  return (
	    <div>Payout ($):
	      <input 
		    type="text"
            value={(this.props.payout).toFixed(2)}
            disabled={true}
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
	    win: 0,
        payout: 0
	  }
	}

    calculateWin() {
      if (this.state.odds > 0) {
        this.setState({win: (this.state.odds * (this.state.bet/100)).toFixed(2)}, function () {
          this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
        });
      } else {
        this.setState({win: ((100/Math.abs(this.state.odds)) * this.state.bet).toFixed(2)}, function () {
          this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
        }); 
      }
    }

    calculateFromWin() {
      if (this.state.odds > 0) {
        this.setState({bet: ((this.state.win / this.state.odds) * 100).toFixed(2)}, function () {
          this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
        });
      } else {
        this.setState({bet: (this.state.win / (100/Math.abs(this.state.odds))).toFixed(2)}, function () {
          this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
        }); 
      }
    }

	handleChange = (event, key) => {
	  switch(key) {
        case 'odds':
    	  this.setState({ odds: event.target.value }, function () {
            this.calculateWin();
          });
          break;
        case 'bet':
          this.setState({ bet: event.target.value }, function () {
            this.calculateWin();
          });
          break;
        case 'win':
          this.setState({ win: event.target.value }, function () {
            this.calculateFromWin();
		  });
		  break;
	    default:
		  break;
      };
	}

	render() {
	  return (
	  <div>
		<Odds odds={this.state.odds} onChange={(event) => this.handleChange(event, 'odds')}/>
		{/*<div>Decimal Odds: <input type="text" /></div>
		<div>Fractional Odds: <input type="text" /></div>
		<div>Implied Odds: <input type="text" /></div>*/}
        <Bet bet={this.state.bet} onChange={(event) => this.handleChange(event, 'bet')}/>
        <Win win={this.state.win} onChange={(event) => this.handleChange(event, 'win')}/>
		<Payout payout={this.state.payout}/>
	  </div>
      );
	}
}

export default Calculator;
