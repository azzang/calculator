import React, { Component } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      lastOperator: '+',
      current: 0,
      previous: 0,
      display: '0',
      history: '',
      lastState: null
    };
  }

  handleDigit(digit, newState) {
    if (/^[+\-×÷0]$/.test(newState.display)) {
      newState.display = '';
    }

    newState.display += digit;

    if (newState.lastOperator === '=') {
      newState.previous = Number(newState.display);
    }
  }

  handleDecimal(newState) {
    if (!/\./.test(newState.display)) {
      if (/^[+\-×÷]$/.test(newState.display)) {
        newState.display = '0';
      }

      newState.display += '.';
    }
  }

  handleOperator(operator, newState) {
    if (!/^[+\-×÷]$/.test(newState.display)) {
      newState.lastState = this.state;

      if (newState.lastOperator === '=') {
         newState.history = newState.display + operator;
      } else {
        newState.history += (newState.display + operator);
      }

      switch(newState.lastOperator) {
        case '+':
          newState.previous = Number(newState.display);
          break;
        case '-':
          newState.previous = -Number(newState.display);
          break;
        case '×':
          newState.previous *= Number(newState.display);
          break;
        case '÷':
          newState.previous /= Number(newState.display);
          break;
        default: break;
      }

      if(/[+\-=]/.test(operator)) {
        newState.current += newState.previous;
      }

      newState.display = operator;
      newState.lastOperator = operator;
    }
  }

  equals(newState) {
    this.handleOperator('=', newState);
    newState.display = Math.round(newState.current * 100) / 100;
    newState.previous = newState.current;
    newState.current = 0;
    newState.history += newState.display;
  }

  clearEntry(newState) {
    if (/^[+\-×÷]$/.test(newState.display)) {
      Object.assign(newState, newState.lastState);
    } else if (newState.lastOperator === '=') {
      this.allClear(newState);
    } else {
      newState.display = '0';
    }
  }

  allClear(newState) {
    Object.assign(newState, this.getInitialState());
  }

  handleButtonClick(e) {
    const buttonValue = e.target.innerHTML;
    const newState = Object.assign({}, this.state);

    if (/\d/.test(buttonValue)) {
      this.handleDigit(buttonValue, newState);
    } else if (/[+\-×÷]/.test(buttonValue)) {
      this.handleOperator(buttonValue, newState);
    } else if (buttonValue === '.') {
      this.handleDecimal(newState);
    } else if (buttonValue === 'CE') {
      this.clearEntry(newState);
    } else if (buttonValue === 'AC') {
      this.allClear(newState);
    } else {
      this.equals(newState);
    }

    this.setState(newState);
  }

  render() {
    return (
      <div className="Calculator">
        <h5>CALCULATOR</h5>
        <Display entry={this.state.display} history={this.state.history} />
        <Keyboard handleClick={this.handleButtonClick.bind(this)} />
      </div>
    );
  }
}

export default Calculator;
