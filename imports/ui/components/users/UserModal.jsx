import React, {PropTypes} from 'react';
import {Button, Modal}    from 'react-bootstrap';
import { Meteor }         from 'meteor/meteor';
import UserForm           from '/imports/ui/components/users/UserForm';

export default class UserModal extends React.Component {
  render() {
    return (
      <div className="modal-container">
        <Modal show={this.props.show} onHide={this.props.closeUserModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.user ?
                'Update' + this.props.user.profile.username
              : 'Add user'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserForm closeUserModal={this.props.closeUserModal.bind(this)} user={this.props.user} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.closeUserModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

UserModal.propTypes = {
  user: PropTypes.object,
};
