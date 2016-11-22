import React, {PropTypes}                               from 'react';
import ReactDOM                                         from 'react-dom';
import {ListGroup, ListGroupItem, ButtonGroup, Button}  from 'react-bootstrap';
import {FormattedDate, IntlProvider}                    from 'react-intl';
import { Meteor }                                       from 'meteor/meteor';
import Alert                                            from '/imports/ui/components/Alert';
import TransferForm                                     from '/imports/ui/components/transfers/TransferForm.jsx';

export default class Transfer extends React.Component {
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

  activeTransfer(e) {
    const doc = {$set: {active: true}};
    Meteor.call("updateTransfer", this.props.transfer._id, doc, (err, result) => {
      if (err) {
        console.error("err ", err);
        return this.setState({error: err.reason});
      }
      this.setState({success: "Transfer has been actived !"});
    });
  }

  deleteTransfer(e) {
    Meteor.call("deleteTransfer", this.props.transfer._id, (err, result) => {
      if (err) {
        console.error("deleteTransfer ", err);
        return this.setState({error: err.reason});
      }
      this.setState({success: "Transfer has been deleted !"});
    });
  }

  render() {
    const createdBy = Meteor.users.findOne({_id: this.props.transfer.createdBy});
    const updatedBy = Meteor.users.findOne({_id: this.props.transfer.updatedBy});
    let fromAccountLink = `/accounts/${this.props.fromAccount._id}`;
    let toAccountLink = `/accounts/${this.props.toAccount._id}`;
    if (this.props.admin) {
      fromAccountLink = `/admin/accounts/${this.props.fromAccount._id}`;
      toAccountLink = `/admin/accounts/${this.props.toAccount._id}`;
    }
    return (
      <div className="transfer">
        {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
        {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
        <ListGroup>
          <ListGroupItem>Value :&nbsp;
            <span>
              {this.props.transfer.value ? this.props.transfer.value : ''}
              &nbsp;<span className="badge">€</span>
            </span>
          </ListGroupItem>
          <ListGroupItem href={fromAccountLink} >
            Sender account :&nbsp;
            {this.props.fromAccount ? `${this.props.fromAccount.name} - ${this.props.fromAccount.balance} €` : ''}
          </ListGroupItem>
          <ListGroupItem href={toAccountLink} >
            Recipient account :&nbsp;
            {this.props.toAccount ? `${this.props.toAccount.name} - ${this.props.toAccount.balance} €` : ''}
          </ListGroupItem>
          <ListGroupItem>Active :&nbsp;
            {this.props.transfer.active ?
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            :
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            }
          </ListGroupItem>
          <ListGroupItem>Checked :&nbsp;
            {this.props.transfer.checked ?
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            :
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            }
          </ListGroupItem>
          <ListGroupItem href={Meteor.user().profile.admin ? `/admin/users/${createdBy._id}` : `/users/${createdBy._id}`}>
            Created by : {createdBy ? createdBy.profile.username : ''}
          </ListGroupItem>
          <ListGroupItem>Created at :&nbsp;
            <IntlProvider locale="en">
              <FormattedDate value={this.props.transfer.createdAt} />
            </IntlProvider>
          </ListGroupItem>
          <ListGroupItem href={Meteor.user().profile.admin ? `/admin/users/${updatedBy._id}` : `/users/${updatedBy._id}`}>
            Updated by : {updatedBy ? updatedBy.profile.username : ''}
          </ListGroupItem>
          <ListGroupItem>Last update at :&nbsp;
            <IntlProvider locale="en">
              <FormattedDate value={this.props.transfer.lastUpdate} />
            </IntlProvider>
          </ListGroupItem>
        </ListGroup>
        {this.state.displayUpdate ? <TransferForm accounts={this.props.accounts} transfer={this.props.transfer} /> : ''}
        <div className="actions">
          <ButtonGroup>
            <Button bsStyle="primary" onClick={this.displayUpdate.bind(this)}>Update</Button>
            {this.props.transfer.active ?
              <Button bsStyle="danger" onClick={this.deleteTransfer.bind(this)}>Delete</Button>
            :
              this.props.admin && <Button bsStyle="success" onClick={this.activeTransfer.bind(this)} >Enable</Button>
            }
          </ButtonGroup>
        </div>
      </div>
    )
  }
}

Transfer.propTypes = {
  transfer: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  fromAccount: PropTypes.object.isRequired,
  toAccount: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired
};
