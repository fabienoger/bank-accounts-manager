import React                  from 'react';
import {Row, Col}             from 'react-bootstrap';
import TrackerReact           from 'meteor/ultimatejs:tracker-react';
import Accounts               from '/imports/api/accounts/collection';
import Transactions           from '/imports/api/transactions/collection';
import TransactionsList       from '/imports/ui/components/transactions/TransactionsList';
import TransactionForm        from '/imports/ui/components/transactions/TransactionForm';
import Loading                from '/imports/ui/components/Loading';
import TransactionsChartsView from '/imports/ui/components/transactions/TransactionsChartsView';

export default class TransactionsPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      transactions: Meteor.subscribe("userTransactions", Meteor.userId()),
      accounts: Meteor.subscribe("userAccounts", Meteor.userId())
    }
  }

  componentWillUnmount() {
    this.state.transactions.stop();
    this.state.accounts.stop();
  }

  getTransactions() {
    return Transactions.find().fetch();
  }

  getAccounts() {
    return Accounts.find().fetch();
  }

  render() {
    if (!this.state.transactions.ready() || !this.state.accounts.ready()) {
      return (<Loading />)
    }
    const accounts = this.getAccounts();
    const transactions = this.getTransactions();
    return (
      <Row className="transactions-page">
        {transactions.length > 0 && <TransactionsChartsView transactions={transactions} />}
        <Col md={6}>
          <TransactionsList transactions={transactions} admin={false} />
        </Col>
        <Col md={6}>
          <TransactionForm accounts={accounts} />
        </Col>
      </Row>
    )
  }
}
