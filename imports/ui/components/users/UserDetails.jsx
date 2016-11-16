import React, {PropTypes}             from 'react';
import {Button}                       from 'react-bootstrap';
import { Meteor }                     from 'meteor/meteor';
import {FormattedDate, IntlProvider}  from 'react-intl';

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let user = this.props.user;
    return (
      <div className="user-details panel panel-primary">
        <div className="panel-heading">{user.profile.username}</div>
        <div className="panel-body">
          <p><span className="label label-primary">Admin</span>&nbsp;
            {user.profile.admin ?
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            :
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            }
          </p>
          <p><span className="label label-primary">Email</span>&nbsp;{user.emails[0].address}</p>
          <p><span className="label label-primary">Active</span>&nbsp;{user.profile.active}</p>
          <p><span className="label label-primary">Language</span>&nbsp;{user.profile.language}</p>
          <p><span className="label label-primary">Created At</span>&nbsp;
            <IntlProvider locale="en">
              <FormattedDate value={user.createdAt} />
            </IntlProvider>
          </p>
        </div>
        <div className="panel-footer">
          <Button bsStyle="danger">Delete</Button>
        </div>
      </div>

    )
  }
}

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
};
