import React, {PropTypes}   from 'react';
import ReactDOM             from 'react-dom';
import {ListGroup, Panel}   from 'react-bootstrap'
import { Meteor }           from 'meteor/meteor';
import Alert                from '/imports/ui/components/Alert'
import AccountItem          from '/imports/ui/components/accounts/AccountItem'
import Accounts             from '/imports/api/accounts/collection'
import Loading              from '/imports/ui/components/Loading'
import TrackerReact         from 'meteor/ultimatejs:tracker-react'

export default class AccountsList extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      accounts: Meteor.subscribe("userAccounts", Meteor.userId())
    }
  }

  componentWillUnmount() {
    this.state.accounts.stop();
  }

  getAccounts() {
    return Accounts.find().fetch();
  }

  render() {
    let accounts = this.getAccounts();
    if (!this.state.accounts.ready()) {
      return (<Loading />)
    }
    return (
      <Panel bsStyle="primary" className="accounts-list" collapsible defaultExpanded header="Accounts List">
        <ListGroup fill>
          {accounts.map((account) => {
            return <AccountItem key={account._id} account={account} />
          })}
        </ListGroup>
      </Panel>
    )
  }
}
