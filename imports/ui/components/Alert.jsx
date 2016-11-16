import React, {PropTypes} from 'react';
import {Row, Col}         from 'react-bootstrap'
import { Meteor }         from 'meteor/meteor';

export default class Alert extends React.Component {
  render() {
    return (
      <div className={"alert alert-" + this.props.type}>
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span className="sr-only">Error:</span>&nbsp;
        {this.props.message}
      </div>
    )
  }
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
