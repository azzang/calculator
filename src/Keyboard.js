import React, { Component } from 'react';
import './Keyboard.css';

class Keyboard extends Component {
  getButtons(values) {
    return values.split(' ').map((value, i) => {
      return (<button key={i} className={'btn btn-' + i}
      onClick={this.props.handleClick}>{value}</button>);
    });
  }

  render() {
    return (
      <div className="Keyboard">
        <div className="left-pane">{this.getButtons('AC CE ÷ 7 8 9 4 5 6 1 2 3 0 .')}</div>
        <div className="right-pane">{this.getButtons('× - + =')}</div>
      </div>
    );
  }
}

export default Keyboard;
