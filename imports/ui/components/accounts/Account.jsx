import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import {ListGroupItem}    from 'react-bootstrap'
import { Meteor }         from 'meteor/meteor';

export default class Account extends React.Component {
  render() {
    return (
      <ListGroupItem>
        <span className="label label-default">
          {this.props.account.name}
        </span>
        {this.props.account.balance} €
      </ListGroupItem>
    )
  }
}

Account.propTypes = {
  account: PropTypes.object.isRequired,
};
