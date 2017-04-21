import React, { Component } from 'react';
import './Display.css';

class Display extends Component {
  render() {
    return (
      <div className="Display">
        <p>{this.props.entry}</p>
        <p className="history">{this.props.history}</p>
      </div>
    );
  }
}

export default Display;
