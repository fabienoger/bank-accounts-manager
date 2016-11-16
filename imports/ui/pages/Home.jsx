
import React                    from 'react';
import {Row, Col}               from 'react-bootstrap'
import TrackerReact             from 'meteor/ultimatejs:tracker-react'
import Accounts                 from '/imports/api/accounts/collection'
import Transactions             from '/imports/api/transactions/collection'
import Loading                  from '/imports/ui/components/Loading'
import AccountTransactionsList  from '/imports/ui/components/accounts/AccountTransactionsList'
import AccountsAdd              from '/imports/ui/components/accounts/AccountsAdd'
import TransactionsAdd          from '/imports/ui/components/transactions/TransactionsAdd'


export default class Home extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      accounts: Meteor.subscribe("userAccounts", Meteor.userId()),
      transactions: Meteor.subscribe("userTransactions", Meteor.userId()),
    }
  }

  componentWillUnmount() {
    this.state.accounts.stop();
    this.state.transactions.stop();
  }

  getAccounts() {
    return Accounts.find({}).fetch();
  }

  render() {
    if (!this.state.accounts.ready() || !this.state.transactions.ready()) {
      return (<Loading />)
    }
    const accounts = this.getAccounts();
    if (accounts.length < 1) {
      return (
        <Row id="home">
          <Col md={6}>
            <AccountsAdd />
          </Col>
          <Col md={6}>
            <TransactionsAdd accounts={accounts} />
          </Col>
        </Row>
      )
    }
    return (
      <Row id="home">
        {accounts.length > 0 ?
          accounts.map((account) => {
            const sub = Meteor.subscribe("accountTransactions", account._id)
            const transactions = Transactions.find({accountId: account._id}).fetch();
            return (
              <Col md={4} key={account._id}>
                <AccountTransactionsList account={account} transactions={transactions} />
              </Col>
            )
          })
        : <Loading />}
      </Row>
    )
  }
}
