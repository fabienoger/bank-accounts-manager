import React                      from 'react';
import {Row, Col, Modal, Button}  from 'react-bootstrap';
import TrackerReact               from 'meteor/ultimatejs:tracker-react';
import Accounts                   from '/imports/api/accounts/collection';
import Transactions               from '/imports/api/transactions/collection';
import Transfers                  from '/imports/api/transfers/collection';
import UsersList                  from '/imports/ui/components/users/UsersList';
import AccountsList               from '/imports/ui/components/accounts/AccountsList';
import TransactionsList           from '/imports/ui/components/transactions/TransactionsList';
import TransfersList              from '/imports/ui/components/transfers/TransfersList';
import UserDetails                from '/imports/ui/components/users/UserDetails';
import Loading                    from '/imports/ui/components/Loading';

export default class AdminPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      accounts: Meteor.subscribe("accounts"),
      transactions: Meteor.subscribe("transactions"),
      transfers: Meteor.subscribe("transfers"),
      users: Meteor.subscribe("users"),
      showModal: false
    }
  }

  componentWillUnmount() {
    this.state.accounts.stop();
    this.state.transactions.stop();
    this.state.transfers.stop();
    this.state.users.stop();
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  setSelectedUser(user) {
    this.setState({
      selectedUser: user,
      showModal: !this.state.showModal
    });
  }

  render() {
    if (!this.state.accounts.ready() || !this.state.transactions.ready()
      || !this.state.users.ready() || !this.state.transfers.ready()) {
      return (<Loading />)
    }
    if (!Meteor.user().profile.admin) {
      FlowRouter.go('/');
    }
    const users = Meteor.users.find({}).fetch();
    const accounts = Accounts.find({}).fetch();
    const transactions = Transactions.find({}).fetch();
    const transfers = Transfers.find({}).fetch();
    const noMarginTop = {
      marginTop: '0'
    };
    return (
      <Row className="admin-page">
        <Col md={3}>
          <div className="page-header" style={noMarginTop}><a href="/admin/users">Users</a></div>
          <UsersList users={users} selectUser={this.setSelectedUser.bind(this)} />
        </Col>
        <Col md={3}>
          <div className="page-header" style={noMarginTop}><a href="/admin/accounts">Accounts</a></div>
          <AccountsList accounts={accounts} admin={true} />
        </Col>
        <Col md={3}>
          <div className="page-header" style={noMarginTop}><a href="/admin/transactions">Transactions</a></div>
          <TransactionsList transactions={transactions} admin={true} />
        </Col>
        <Col md={3}>
          <div className="page-header" style={noMarginTop}><a href="/admin/transfers">Transfers</a></div>
          <TransfersList accounts={accounts} transfers={transfers} admin={true} />
        </Col>
        {this.state.selectedUser ?
          <Modal show={this.state.showModal} onHide={this.toggleModal.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selectedUser.profile.username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <UserDetails admin={true} user={this.state.selectedUser} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.toggleModal.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
        : ''
        }
      </Row>
    )
  }
}
