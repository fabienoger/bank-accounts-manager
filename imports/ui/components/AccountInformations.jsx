import React                              from 'react';
import ReactDOM                           from 'react-dom';
import {ListGroup, ListGroupItem, Panel}  from 'react-bootstrap'
import { Meteor }                         from 'meteor/meteor';
import Alert                              from '/imports/ui/components/Alert'

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
      <Panel bsStyle="primary" className="account-informations" collapsible defaultExpanded header="Account informations">
        <ListGroup fill>
          <ListGroupItem>
            <span className="label label-primary">Username</span>&nbsp;
            {this.state.user ? this.state.user.profile.username : ''}
          </ListGroupItem>
          <ListGroupItem>
            <span className="label label-primary">Email</span>&nbsp;
            {this.state.user ? this.state.user.emails[0].address : ''}
          </ListGroupItem>
        </ListGroup>
      </Panel>
    )
  }
}
