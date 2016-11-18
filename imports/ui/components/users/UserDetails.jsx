import React, {PropTypes}             from 'react';
import {Button, Label}                from 'react-bootstrap';
import { Meteor }                     from 'meteor/meteor';
import {FormattedDate, IntlProvider}  from 'react-intl';

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  removeUser() {
    Meteor.call("removeUser", this.props.user._id, (err, result) => {
      if (err) {
        return console.error("removeUser ", result);
      }
      this.props.updateUser(this.props.user);
    });
  }

  activeUser() {
    const doc = {$set: {'profile.active': true}};
    Meteor.call("updateUser", this.props.user._id, doc, (err, result) => {
      if (err) {
        return console.error("updateUser ", result);
      }
      this.props.updateUser(this.props.user);
    });
  }

  render() {
    let user = this.props.user;
    return (
      <div className="user-details panel panel-primary">
        <div className="panel-heading">
          {user.profile.username}
          {user.profile.active ?
            <Label className="pull-right" bsStyle="success">Enabled</Label>
          :
            <Label className="pull-right" bsStyle="warning">Disabled</Label>
          }
        </div>
        <div className="panel-body">
          <p><Label bsStyle="primary">Id</Label> {user._id}</p>
          <p><Label bsStyle="primary">Admin</Label>&nbsp;
            {user.profile.admin ?
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            :
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            }
          </p>
          <p><Label bsStyle="primary">Email</Label>&nbsp;{user.emails[0].address}</p>
          <p><Label bsStyle="primary">Active</Label>&nbsp;
            {user.profile.active ?
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            :
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            }
          </p>
          <p><Label bsStyle="primary">Language</Label>&nbsp;{user.profile.language}</p>
          <p><Label bsStyle="primary">Created At</Label>&nbsp;
            <IntlProvider locale="en">
              <FormattedDate value={user.createdAt} />
            </IntlProvider>
          </p>
        </div>
        {this.props.admin ?
          <div className="panel-footer">
            <Button bsStyle="success" onClick={this.props.openUserModal.bind(this)} >Update</Button>,
            {user.profile.active ?
              <Button bsStyle="danger" onClick={this.removeUser.bind(this)} >Disable</Button>
              :
              <Button bsStyle="primary" onClick={this.activeUser.bind(this)} >Enable</Button>
            }
          </div>
        : ''}
      </div>

    )
  }
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired
};
