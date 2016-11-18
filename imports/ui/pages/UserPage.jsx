import React, {PropTypes}       from 'react';
import {Row, Col}               from 'react-bootstrap';
import Accounts                 from '/imports/api/accounts/collection';
import TrackerReact             from 'meteor/ultimatejs:tracker-react';
import Loading                  from '/imports/ui/components/Loading';
import UserDetails              from '/imports/ui/components/users/UserDetails';
import UserModal                from '/imports/ui/components/users/UserModal';
import AccountTransactionsList  from '/imports/ui/components/accounts/AccountTransactionsList';


export default class UserPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      userSub: Meteor.subscribe("user", this.props.userId),
      accountsSub: Meteor.subscribe("userAccounts", this.props.userId),
      transactionsSub: Meteor.subscribe("userTransactions", this.props.userId),
      userModal: null,
      user: null
    }
  }

  componentWillUnmount() {
    this.state.userSub.stop();
    this.state.accountsSub.stop();
    this.state.transactionsSub.stop();
  }

  toggleUserModal() {
    this.setState({userModal: !this.state.userModal});
  }

  setSelectedUser(user) {
    this.setState({user: user});
  }

  render() {
    if (!this.state.userSub.ready() || !this.state.accountsSub.ready() || !this.state.transactionsSub.ready()) {
      return (<Loading />)
    }
    const accounts = Accounts.find({createdBy: this.props.userId}).fetch();
    const user = Meteor.users.findOne({_id: this.props.userId});
    return (
      <Row className="user-page">
        <Col md={this.props.admin ? 6 : 8} mdOffset={this.props.admin ? 0 : 2}>
          <UserDetails user={user} admin={this.props.admin}
            updateUser={this.setSelectedUser.bind(this)}
            openUserModal={this.toggleUserModal.bind(this)}
          />
        </Col>
        {this.props.admin &&
          <Col md={6}>
            {accounts.map((account) => {
              let transactions = Transactions.find({accountId: account._id}).fetch();
              return (<AccountTransactionsList key={account._id}
                admin={this.props.admin} account={account} transactions={transactions} />
              )
            })}
          </Col>
        }
        {this.state.userModal ?
          <UserModal user={user} show={this.state.userModal}
            closeUserModal={this.toggleUserModal.bind(this)} />
        : '' }
      </Row>
    )
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
  admin: PropTypes.bool.isRequired
};
