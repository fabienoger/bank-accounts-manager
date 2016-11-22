import React        from 'react';
import {Row, Col}   from 'react-bootstrap'
import { Meteor }   from 'meteor/meteor';

export default class Loading extends React.Component {
  render() {
    const loadingStyle = {
      width: '30px',
      height: '30px',
      borderColor: '#457D97'
    };
    return (
      <div className="loading" style={loadingStyle}></div>
    )
  }
}
