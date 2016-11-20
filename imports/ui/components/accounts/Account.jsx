import React, {PropTypes}                               from 'react';
import ReactDOM                                         from 'react-dom';
import {ListGroup, ListGroupItem, ButtonGroup, Button}  from 'react-bootstrap';
import {FormattedDate, IntlProvider}                    from 'react-intl';
import { Meteor }                                       from 'meteor/meteor';
import Alert                                            from '/imports/ui/components/Alert';
import AccountForm                                      from '/imports/ui/components/accounts/AccountForm';

export default class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      displayUpdate: false
    }
  }

  displayUpdate(e) {
    this.setState({displayUpdate: !this.state.displayUpdate});
  }

  deleteAccount(e) {
    Meteor.call("deleteAccount", this.props.account._id, (err, result) => {
      if (err) {
        console.error("deleteAccount ", err);
        this.setState({error: err.reason});
        return;
      }
      this.setState({success: "Account has been deleted !"});
    });
  }

  render() {
    const createdBy = Meteor.users.findOne({_id: this.props.account.createdBy});
    const updatedBy = Meteor.users.findOne({_id: this.props.account.updatedBy});
    let urlToAccount = `/accounts/${this.props.account._id}`;
    if (this.props.admin) {
      urlToAccount = `/admin/accounts/${this.props.account._id}`;
    }
    return (
      <div className="account">
        {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
        {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
        <ListGroup>
          <ListGroupItem>Name : {this.props.account.name ? this.props.account.name : ''}</ListGroupItem>
          <ListGroupItem>Balance :&nbsp;
            <span>
              {this.props.account.balance ? this.props.account.balance : ''}
              &nbsp;<span className="badge">€</span>
            </span>
          </ListGroupItem>
          <ListGroupItem href={this.props.admin ? `/admin/users/${createdBy._id}` : `/users/${createdBy._id}`}>
            Created by : {createdBy ? createdBy.profile.username : ''}
          </ListGroupItem>
          <ListGroupItem>Created at :&nbsp;
            <IntlProvider locale="en">
              <FormattedDate value={this.props.account.createdAt} />
            </IntlProvider>
          </ListGroupItem>
          <ListGroupItem href={this.props.admin ? `/admin/users/${updatedBy._id}` : `/users/${updatedBy._id}`}>
            Updated by : {updatedBy ? updatedBy.profile.username : ''}
          </ListGroupItem>
          <ListGroupItem>Last update at :&nbsp;
            <IntlProvider locale="en">
              <FormattedDate value={this.props.account.lastUpdate} />
            </IntlProvider>
          </ListGroupItem>
        </ListGroup>
        {this.state.displayUpdate ? <AccountForm account={this.props.account} /> : ''}
        <div className="actions">
          <ButtonGroup>
            <Button href={urlToAccount} bsStyle="info">Details</Button>
            <Button bsStyle="primary" onClick={this.displayUpdate.bind(this)}>Update</Button>
            <Button bsStyle="danger" onClick={this.deleteAccount.bind(this)}>Delete</Button>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}

Account.propTypes = {
  account: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired
};
