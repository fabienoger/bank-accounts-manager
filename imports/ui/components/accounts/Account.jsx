import React, {PropTypes}                               from 'react';
import ReactDOM                                         from 'react-dom';
import {ListGroup, ListGroupItem, ButtonGroup, Button}  from 'react-bootstrap';
import { Meteor }                                       from 'meteor/meteor';
import Alert                                            from '/imports/ui/components/Alert';

export default class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null
    }
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
    return (
      <div className="account">
        {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
        {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
        {this.props.account.name}
        <span className="badge pull-right">{this.props.account.balance} €</span>
        <ListGroup>
          <ListGroupItem>Created by : {createdBy.profile.username}</ListGroupItem>
          <ListGroupItem>Created at : {this.props.account.createdAt}</ListGroupItem>
          <ListGroupItem>Last update at : {this.props.account.lastUpdate}</ListGroupItem>
        </ListGroup>
        <div className="actions">
          <ButtonGroup>
            <Button bsStyle="primary">Update</Button>
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
