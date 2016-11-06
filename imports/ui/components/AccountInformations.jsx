import React        from 'react';
import ReactDOM     from 'react-dom';
import {Row, Col}   from 'react-bootstrap'
import { Meteor }   from 'meteor/meteor';
import Alert        from '/imports/ui/components/Alert'

export default class AccountInformations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    Meteor.subscribe('users', (err, res) => {
      this.setState({user: Meteor.users.findOne({_id: Meteor.userId()})});
      Tracker.autorun(() => {
        const userId = Meteor.userId()
        this.setState({user: Meteor.users.findOne({_id: Meteor.userId()})});
      });
    })
  }

  render() {
    return (
      <div className="account-informations">
        <div className="page-header">
          <h2>Account informations</h2>
        </div>
        <div>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="label label-primary">Username</span>&nbsp;
              {this.state.user ? this.state.user.profile.username : ''}
            </li>
            <li className="list-group-item">
              <span className="label label-primary">Email</span>&nbsp;
              {this.state.user ? this.state.user.emails[0].address : ''}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
