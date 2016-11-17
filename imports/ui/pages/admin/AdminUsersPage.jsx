import React                from 'react';
import {Row, Col, Button}   from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import UsersList            from '/imports/ui/components/users/UsersList';
import UserDetails          from '/imports/ui/components/users/UserDetails';
import UserModal            from '/imports/ui/components/users/UserModal';
import Loading              from '/imports/ui/components/Loading';

export default class AdminUsersPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      accounts: Meteor.subscribe("allAccounts"),
      transactions: Meteor.subscribe("allTransactions"),
      users: Meteor.subscribe("allUsers"),
      selectedUser: null,
      userModal: false
    }
  }

  componentWillUnmount() {
    this.state.accounts.stop();
    this.state.transactions.stop();
    this.state.users.stop();
  }

  setSelectedUser(user) {
    user = Meteor.users.findOne({_id: user._id});
    this.setState({selectedUser: user});
  }

  toggleUserModal() {
    this.setState({userModal: !this.state.userModal});
  }

  render() {
    if (!this.state.accounts.ready() || !this.state.transactions.ready() || !this.state.users.ready()) {
      return (<Loading />)
    }
    if (!Meteor.user().profile.admin) {
      FlowRouter.go('/');
    }
    const users = Meteor.users.find({}).fetch();
    return (
      <Row className="admin-users-page">
        <Col md={6}>
          <UsersList selectUser={this.setSelectedUser.bind(this)} users={users} />
        </Col>
        <Col md={6}>
          {this.state.selectedUser ?
            <UserDetails user={this.state.selectedUser}
              updateUser={this.setSelectedUser.bind(this)}
              openUserModal={this.toggleUserModal.bind(this)} />
          :
            <Button bsStyle="primary" onClick={this.toggleUserModal.bind(this)} >New user</Button>
          }
          {this.state.userModal ?
            <UserModal user={this.state.selectedUser} show={this.state.userModal}
              closeUserModal={this.toggleUserModal.bind(this)} />
          : '' }
        </Col>
      </Row>
    )
  }
}
