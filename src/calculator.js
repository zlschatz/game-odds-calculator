import React, { Component } from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import './App.css';

class Odds extends Component {
  render() {
    return (
        <TextField
          hintText="ex. +110 or 5/2"
          floatingLabelText="Odds"
          value={(this.props.odds) ? (this.props.odds) : ''}
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
          hintText="ex. 100"
          floatingLabelText="Bet Amount ($)"
          value={(this.props.bet > 0) ? (this.props.bet) : ''}
          onChange={this.props.onChange}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          disabled={(this.props.odds) ? false : true}
        />
      );
    }
}

class Win extends Component {
    render() {
      return (
        <TextField
          hintText="ex. 1000"
          floatingLabelText="To Win ($)"
          value={(isFinite(this.props.win) && (this.props.win > 0)) ? (this.props.win) : ''}
          onChange={this.props.onChange}
          underlineStyle={styles.underlineStyle}
          underlineFocusStyle={styles.underlineStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          disabled={(this.props.odds) ? false : true}
        />
      );
    }
}

class Payout extends Component {
	render() {
	  return (
        <TextField
          floatingLabelText="Payout ($)"
          value={(isFinite(this.props.payout) && (this.props.payout > 0)) ? (this.props.payout) : ''}
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

  convertOdds(odds) {
    if ((odds).includes('/') && (odds.split('/')[1] !== '')) {
      var fraction = odds.split('/');
      return ((fraction[0] / fraction[1]) * 100);
    } else {
      return odds
    }
  }

  calculateWin() {
    var odds = this.convertOdds(this.state.odds);
    if (odds > 0) {
      this.setState({win: (odds * (this.state.bet/100)).toFixed(2)}, function () {
        this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
      });
    } else {
      this.setState({win: ((100/Math.abs(odds)) * this.state.bet).toFixed(2)}, function () {
        this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
      });
    }
  }

  calculateFromWin() {
    var odds = this.convertOdds(this.state.odds);
    if (odds > 0) {
      this.setState({bet: ((this.state.win / odds) * 100).toFixed(2)}, function () {
        this.setState({payout: (parseFloat(this.state.bet) + parseFloat(this.state.win))});
      });
    } else {
      this.setState({bet: (this.state.win / (100/Math.abs(odds))).toFixed(2)}, function () {
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
        <Bet bet={this.state.bet} odds={this.state.odds} onChange={(event) => this.handleChange(event, 'bet')}/>
        <br />
        <Win win={this.state.win} odds={this.state.odds} onChange={(event) => this.handleChange(event, 'win')}/>
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
