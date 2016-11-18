import React, {PropTypes}   from 'react';
import {Row, Col}           from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import Loading              from '/imports/ui/components/Loading';
import UserDetails          from '/imports/ui/components/users/UserDetails';
import UserModal            from '/imports/ui/components/users/UserModal';


export default class UserPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      userSub: Meteor.subscribe("user", this.props.userId),
      userModal: null,
      user: null
    }
  }

  componentWillUnmount() {
    this.state.userSub.stop();
  }

  toggleUserModal() {
    this.setState({userModal: !this.state.userModal});
  }

  setSelectedUser(user) {
    this.setState({user: user});
  }

  render() {
    if (!this.state.userSub.ready()) {
      return (<Loading />)
    }
    const user = Meteor.users.findOne({_id: this.props.userId});
    return (
      <Row className="user-page">
        <Col md={8} mdOffset={2}>
          <UserDetails user={user} admin={this.props.admin}
            updateUser={this.setSelectedUser.bind(this)}
            openUserModal={this.toggleUserModal.bind(this)}
          />
        </Col>
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
