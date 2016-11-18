import React                from 'react';
import {Row, Col, Button}   from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import UsersList            from '/imports/ui/components/users/UsersList';
import UserDetails          from '/imports/ui/components/users/UserDetails';
import UserModal            from '/imports/ui/components/users/UserModal';
import FindUsers            from '/imports/ui/components/users/FindUsers';
import Loading              from '/imports/ui/components/Loading';

export default class AdminUsersPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      users: Meteor.subscribe("allUsers"),
      selectedUser: null,
      userModal: false,
      findUsers: false
    }
  }

  componentWillUnmount() {
    this.state.users.stop();
  }

  setSelectedUser(user) {
    user = Meteor.users.findOne({_id: user._id});
    this.setState({selectedUser: user});
  }

  toggleUserModal() {
    this.setState({userModal: !this.state.userModal});
  }

  findUsers(str) {
    const users = Meteor.users.find({
      $or: [
        {_id: {$regex: str}},
        {'profile.username': {$regex: str}},
        {'emails.address': {$regex: str}}
      ]
    }).fetch();
    this.setState({findUsers: users});
  }

  render() {
    if (!this.state.users.ready()) {
      return (<Loading />)
    }
    if (!Meteor.user().profile.admin) {
      FlowRouter.go('/');
    }
    let users = [];
    if (this.state.findUsers) {
      users = this.state.findUsers;
    } else {
      users = Meteor.users.find({}).fetch();
    }
    return (
      <Row className="admin-users-page">
        <Col md={12}>
          <Button bsStyle="primary" onClick={this.toggleUserModal.bind(this)} >New user</Button>
          <FindUsers findUsers={this.findUsers.bind(this)} />
          <div className="divider"></div>
        </Col>
        <Col md={6}>
          <UsersList selectUser={this.setSelectedUser.bind(this)} users={users} />
        </Col>
        <Col md={6}>
          {this.state.selectedUser ?
            <UserDetails user={this.state.selectedUser} admin={true}
              updateUser={this.setSelectedUser.bind(this)}
              openUserModal={this.toggleUserModal.bind(this)} />
          : ''}
          {this.state.userModal ?
            <UserModal user={this.state.selectedUser} show={this.state.userModal}
              closeUserModal={this.toggleUserModal.bind(this)} />
          : '' }
        </Col>
      </Row>
    )
  }
}
