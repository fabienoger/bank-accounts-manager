import React, {PropTypes}                               from 'react';
import ReactDOM                                         from 'react-dom';
import {ListGroup, ListGroupItem, ButtonGroup, Button}  from 'react-bootstrap';
import { Meteor }                                       from 'meteor/meteor';
import Alert                                            from '/imports/ui/components/Alert';
import AccountUpdate                                    from '/imports/ui/components/accounts/AccountUpdate.jsx';

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
    return (
      <div className="account">
        {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
        {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
        {this.props.account.name}
        <span className="badge pull-right">{this.props.account.balance} €</span>
        <ListGroup>
          <ListGroupItem>Created by : {createdBy ? createdBy.profile.username : ''}</ListGroupItem>
          <ListGroupItem>Created at : {this.props.account.createdAt}</ListGroupItem>
          <ListGroupItem>Updated by : {updatedBy ? updatedBy.profile.username : ''}</ListGroupItem>
          <ListGroupItem>Last update at : {this.props.account.lastUpdate}</ListGroupItem>
        </ListGroup>
        {this.state.displayUpdate ? <AccountUpdate account={this.props.account} /> : ''}
        <div className="actions">
          <ButtonGroup>
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
};