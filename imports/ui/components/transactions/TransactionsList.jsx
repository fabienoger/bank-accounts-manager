import React, {PropTypes}   from 'react';
import ReactDOM             from 'react-dom';
import {ListGroup}          from 'react-bootstrap'
import { Meteor }           from 'meteor/meteor';
import Alert                from '/imports/ui/components/Alert'
import TransactionItem      from '/imports/ui/components/transactions/TransactionItem'
import Transactions         from '/imports/api/transactions/collection'
import Loading              from '/imports/ui/components/Loading'
import TrackerReact         from 'meteor/ultimatejs:tracker-react'

export default class TransactionsList extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      transactions: Meteor.subscribe("transactions")
    }
  }

  componentWillUnmount() {
    this.state.transactions.stop();
  }

  getTransactions() {
    return Transactions.find().fetch();
  }

  render() {
    let transactions = this.getTransactions();
    if (!this.state.transactions.ready()) {
      return (<Loading />)
    }
    return (
      <div className="transactions-list">
        <div className="page-header">
          <h2>Transactions List</h2>
        </div>
        <ListGroup>
          {transactions.map((transaction) => {
            return <TransactionItem key={transaction._id} transaction={transaction} />
          })}
        </ListGroup>
      </div>
    )
  }
}
