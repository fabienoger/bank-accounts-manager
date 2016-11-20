import React, {PropTypes}       from 'react';
import {Row, Col}               from 'react-bootstrap'
import TrackerReact             from 'meteor/ultimatejs:tracker-react'
import Accounts                 from '/imports/api/accounts/collection'
import Transactions             from '/imports/api/transactions/collection'
import AccountForm              from '/imports/ui/components/accounts/AccountForm'
import AccountTransactionsList  from '/imports/ui/components/accounts/AccountTransactionsList'
import TransactionForm          from '/imports/ui/components/transactions/TransactionForm'
import Loading                  from '/imports/ui/components/Loading'

export default class AccountPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      account: Meteor.subscribe("userAccounts", Meteor.userId()),
      transactions: Meteor.subscribe("accountTransactions", this.props.accountId),
    }
  }

  componentWillUnmount() {
    this.state.account.stop();
    this.state.transactions.stop();
  }

  render() {
    if (!this.state.account.ready() || !this.state.transactions.ready()) {
      return (<Loading />)
    }
    const account = Accounts.findOne({_id: this.props.accountId});
    const accounts = Accounts.find({}).fetch();
    const transactions = Transactions.find({accountId: this.props.accountId}).fetch();
    return (
      <Row className="accounts-page">
        <Col md={6}>
          <AccountTransactionsList account={account} transactions={transactions} admin={false} />
        </Col>
        <Col md={6}>
          <AccountForm account={account} />
          <TransactionForm accountId={this.props.accountId} accounts={accounts} />
        </Col>
      </Row>
    )
  }
}

AccountPage.propTypes = {
  accountId: PropTypes.string.isRequired,
};
