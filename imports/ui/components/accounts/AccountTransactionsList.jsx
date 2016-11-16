import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import {ListGroup}        from 'react-bootstrap'
import { Meteor }         from 'meteor/meteor';
import TransactionItem    from '/imports/ui/components/transactions/TransactionItem'
import TransactionsAdd     from '/imports/ui/components/transactions/TransactionsAdd'

export default class AccountTransactionsList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const account = this.props.account;
    const transactions = this.props.transactions;
    const accountLink = `/accounts/${account._id}`;
    return (
      <div className="account-transactions-list">
        <div className="page-header">
          {account ?
            <a href={accountLink}>
              <h2>{account.name} <small>{account.balance} €</small></h2>
            </a>
          : '' }
        </div>
        {transactions.length > 0 ?
        <ListGroup>
          {transactions.map((transaction) => {
            return <TransactionItem key={transaction._id} transaction={transaction} />
          })}
        </ListGroup>
        :
          <TransactionsAdd accounts={[account]} />
        }
      </div>
    )
  }
}
AccountTransactionsList.propTypes = {
  account: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};
