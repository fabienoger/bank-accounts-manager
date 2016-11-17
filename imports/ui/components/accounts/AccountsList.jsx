import React, {PropTypes}   from 'react';
import ReactDOM             from 'react-dom';
import {ListGroup, Panel}   from 'react-bootstrap';
import { Meteor }           from 'meteor/meteor';
import AccountItem          from '/imports/ui/components/accounts/AccountItem';

export default class AccountsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  render() {
    const accounts = this.props.accounts;
    return (
      <Panel bsStyle="primary" className="accounts-list" collapsible defaultExpanded header="Accounts List">
        <ListGroup fill>
          {accounts.map((account) => {
            return <AccountItem key={account._id} account={account} admin={this.props.admin} />
          })}
        </ListGroup>
      </Panel>
    )
  }
}

AccountsList.propTypes = {
  accounts: PropTypes.array.isRequired,
  admin: PropTypes.bool.isRequired
};
