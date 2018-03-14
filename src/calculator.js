import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import './App.css';

class Odds extends Component {
	render() {
	  return (
        <TextField
          hintText="+110"
          floatingLabelText="American Odds"
          value={(this.props.odds)}
          onChange={this.props.onChange}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
	  );
	}
}

class Bet extends Component {
    render() {
      return (
        <TextField
          hintText="100"
          floatingLabelText="Bet Amount ($)"
          value={(this.props.bet)}
          onChange={this.props.onChange}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
      );
    }
}

class Win extends Component {
    render() {
      return (
        <TextField
          floatingLabelText="To Win ($)"
          value={(this.props.win)}
          onChange={this.props.onChange}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
      );
    }
}

class Payout extends Component {
	render() {
	  return (
        <TextField
          floatingLabelText="Payout ($)"
          value={(this.props.payout).toFixed(2)}
          disabled={true}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
	  );
	}
}

class Calculator extends Component {
	constructor(props) {
	  super(props);

	  this.state = initialState;
	}

    clearState() {
        this.setState(initialState);
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
      <Card>
        <CardTitle title="What Are the Odds?" subtitle="A Game Calculator" />
        <CardText>
        <Odds odds={this.state.odds} onChange={(event) => this.handleChange(event, 'odds')}/>
        <br />
        {/*<div>Decimal Odds: <input type="text" /></div>
        <div>Fractional Odds: <input type="text" /></div>
        <div>Implied Odds: <input type="text" /></div>*/}
        <Bet bet={this.state.bet} onChange={(event) => this.handleChange(event, 'bet')}/>
        <br />
        <Win win={this.state.win} onChange={(event) => this.handleChange(event, 'win')}/>
        <br />
        <Payout payout={this.state.payout}/>
        </CardText>
        <CardActions>
          <FlatButton label="Reset" onClick={() => this.clearState()} />
        </CardActions>
      </Card>
		
	  </div>
      );
	}
}

const initialState = {
    odds: 0,
    bet: 0,
    win: 0,
    payout: 0
}

const styles = {
  errorStyle: {
    color: 'grey',
  },
  underlineStyle: {
    borderColor: 'grey',
  },
  floatingLabelStyle: {
    color: 'grey',
  },
  floatingLabelFocusStyle: {
    color: 'grey',
  },
};

export default Calculator;
