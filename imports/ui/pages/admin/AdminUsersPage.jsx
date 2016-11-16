import React                from 'react';
import {Row, Col}           from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import UsersList            from '/imports/ui/components/users/UsersList';
import UserDetails         from '/imports/ui/components/users/UserDetails';
import Loading              from '/imports/ui/components/Loading';

export default class AdminUsersPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      accounts: Meteor.subscribe("accounts"),
      transactions: Meteor.subscribe("transactions"),
      users: Meteor.subscribe("users"),
      selectedUser: null
    }
  }

  componentWillUnmount() {
    this.state.accounts.stop();
    this.state.transactions.stop();
    this.state.users.stop();
  }

  setSelectedUser(user) {
    this.setState({selectedUser: user});
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
            <UserDetails user={this.state.selectedUser} />
          : ''}
        </Col>
      </Row>
    )
  }
}
