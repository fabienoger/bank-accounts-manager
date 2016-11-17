import React, {PropTypes}   from 'react';
import ReactDOM             from 'react-dom';
import {ListGroup, Panel}   from 'react-bootstrap';
import { Meteor }           from 'meteor/meteor';
import UserItem             from '/imports/ui/components/users/UserItem';
import Alert                from '/imports/ui/components/Alert'

export default class UsersList extends React.Component {
  constructor(props) {
    super(props)
  }

  setSelectedUser(user) {
    this.props.selectUser(user);
  }

  render() {
    let users = this.props.users;
    return (
      <Panel bsStyle="primary" className="users-list" collapsible defaultExpanded header="Users List">
        {users.length > 0 ?
          <ListGroup fill>
            {users.map((user) => {
              return <UserItem key={user._id} user={user} setSelectedUser={this.setSelectedUser.bind(this)} />
            })}
          </ListGroup>
        :
          <Alert type="warning" message="No users found !" />
        }
      </Panel>
    )
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  selectUser: PropTypes.func
};
