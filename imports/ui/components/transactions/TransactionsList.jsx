import React, {PropTypes}   from 'react';
import ReactDOM             from 'react-dom';
import {ListGroup, Panel}   from 'react-bootstrap'
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
      <Panel bsStyle="primary" className="transactions-list" collapsible defaultExpanded header="Transactions List">
        {transactions.length > 0 ?
          <ListGroup fill>
            {transactions.map((transaction) => {
              return <TransactionItem key={transaction._id} transaction={transaction} />
            })}
          </ListGroup>
        :
          <Alert type="warning" message="No transactions found !" />
        }
      </Panel>
    )
  }
}

TransactionsList.propTypes = {
  transactions: PropTypes.array.isRequired,
};
