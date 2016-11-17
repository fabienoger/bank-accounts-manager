import React, {PropTypes}                         from 'react';
import {Button, Label, ListGroup, ListGroupItem}  from 'react-bootstrap';
import { Meteor }                                 from 'meteor/meteor';
import {FormattedDate, IntlProvider}              from 'react-intl';

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
          <p><span className="label label-primary">Admin</span>&nbsp;
            {user.profile.admin ?
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            :
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            }
          </p>
          <p><span className="label label-primary">Email</span>&nbsp;{user.emails[0].address}</p>
          <p><span className="label label-primary">Active</span>&nbsp;
            {user.profile.active ?
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            :
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            }
          </p>
          <p><span className="label label-primary">Language</span>&nbsp;{user.profile.language}</p>
          <p><span className="label label-primary">Created At</span>&nbsp;
            <IntlProvider locale="en">
              <FormattedDate value={user.createdAt} />
            </IntlProvider>
          </p>
        </div>
        <div className="panel-footer">
          <Button bsStyle="success" onClick={this.props.openUserModal.bind(this)} >Update</Button>
          {user.profile.active ?
            <Button bsStyle="danger" onClick={this.removeUser.bind(this)} >Disable</Button>
          :
            <Button bsStyle="primary" onClick={this.activeUser.bind(this)} >Enable</Button>
          }
        </div>
      </div>

    )
  }
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
};
