import React, {PropTypes}   from 'react';
import {ListGroupItem}      from 'react-bootstrap';
import { Meteor }           from 'meteor/meteor';

export default class UserItem extends React.Component {
  constructor(props) {
    super(props)
  }

  setUser() {
    this.props.setSelectedUser(this.props.user);
  }

  render() {
    let user = this.props.user;
    return (
      <ListGroupItem onClick={this.setUser.bind(this)}>
        {user.profile.username}
      </ListGroupItem>
    )
  }
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};
