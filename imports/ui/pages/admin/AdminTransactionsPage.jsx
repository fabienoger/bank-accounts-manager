import React                from 'react';
import {Row, Col, Button}   from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import Accounts             from '/imports/api/accounts/collection';
import Loading              from '/imports/ui/components/Loading';
import TransactionsList     from '/imports/ui/components/transactions/TransactionsList';
import TransactionForm      from '/imports/ui/components/transactions/TransactionForm';

export default class AdminTransactionsPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      transactions: Meteor.subscribe("allTransactions"),
      accounts: Meteor.subscribe("allAccounts")
    }
  }

  componentWillUnmount() {
    this.state.transactions.stop();
  }

  render() {
    if (!this.state.transactions.ready()) {
      return (<Loading />)
    }
    const transactions = Transactions.find({}).fetch();
    const accounts = Accounts.find({}).fetch();
    return (
      <Row className="admin-transactions-page">
        <Col md={6}>
          <TransactionsList transactions={transactions} admin={true} />
        </Col>
        <Col md={6}>
          <TransactionForm accounts={accounts} />
        </Col>
      </Row>
    )
  }
}
