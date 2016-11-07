import React, {PropTypes}   from 'react';
import ReactDOM             from 'react-dom';
import {ListGroup}          from 'react-bootstrap'
import { Meteor }           from 'meteor/meteor';
import Alert                from '/imports/ui/components/Alert'
import Account              from '/imports/ui/components/accounts/Account'
import Accounts             from '/imports/api/accounts/collection'
import Loading              from '/imports/ui/components/Loading'
import TrackerReact         from 'meteor/ultimatejs:tracker-react'

export default class AccountsList extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      accounts: Meteor.subscribe("accounts")
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
      <div className="accounts-list">
        <div className="page-header">
          <h2>Accounts List</h2>
        </div>
        <ListGroup>
          {accounts.map((account) => {
            return <Account key={account._id} account={account} />
          })}
        </ListGroup>
      </div>
    )
  }
}
