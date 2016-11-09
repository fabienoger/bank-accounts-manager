import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import {ListGroup}        from 'react-bootstrap'
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert'
import Accounts           from '/imports/api/accounts/collection'
import Transactions       from '/imports/api/transactions/collection'
import Loading            from '/imports/ui/components/Loading'
import TrackerReact       from 'meteor/ultimatejs:tracker-react'
import TransactionItem    from '/imports/ui/components/transactions/TransactionItem'

export default class AccountTransactionsList extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      account: Meteor.subscribe("userAccounts", Meteor.userId()),
      transactions: Meteor.subscribe("transactions", this.props.accountId),
    }
  }

  componentWillUnmount() {
    this.state.account.stop();
    this.state.transactions.stop();
  }

  getTransactions() {
    return Transactions.find().fetch();
  }

  getAccount(id) {
    if (!id) {
      return;
    }
    return Accounts.findOne({_id: id});
  }

  render() {
    let account = this.getAccount(this.props.accountId);
    let transactions = this.getTransactions();
    if (!this.state.transactions.ready() || !this.state.account.ready()) {
      return (<Loading />)
    }
    return (
      <div className="accounts-transactions-list">
        <div className="page-header">
          {account ?
            <h2>{account.name} <small>{account.balance} €</small></h2>
          : '' }
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
AccountTransactionsList.propTypes = {
  accountId: PropTypes.string.isRequired,
};
