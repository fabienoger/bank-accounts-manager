import React, {PropTypes}   from 'react';
import ReactDOM             from 'react-dom';
import {ListGroup}          from 'react-bootstrap'
import { Meteor }           from 'meteor/meteor';
import Alert                from '/imports/ui/components/Alert'
import TransactionItem      from '/imports/ui/components/transactions/TransactionItem'

export default class TransactionsList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let transactions = this.props.transactions;
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

TransactionsList.propTypes = {
  transactions: PropTypes.array.isRequired,
};
