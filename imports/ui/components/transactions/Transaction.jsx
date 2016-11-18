import React, {PropTypes}                               from 'react';
import ReactDOM                                         from 'react-dom';
import {ListGroup, ListGroupItem, ButtonGroup, Button}  from 'react-bootstrap';
import {FormattedDate, IntlProvider}                    from 'react-intl';
import { Meteor }                                       from 'meteor/meteor';
import Alert                                            from '/imports/ui/components/Alert';
import TransactionUpdate                                from '/imports/ui/components/transactions/TransactionUpdate.jsx';

export default class Transaction extends React.Component {
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

  deleteTransaction(e) {
    Meteor.call("deleteTransaction", this.props.transaction._id, (err, result) => {
      if (err) {
        console.error("deleteTransaction ", err);
        this.setState({error: err.reason});
        return;
      }
      this.setState({success: "Transaction has been deleted !"});
    });
  }

  render() {
    const createdBy = Meteor.users.findOne({_id: this.props.transaction.createdBy});
    const updatedBy = Meteor.users.findOne({_id: this.props.transaction.updatedBy});
    const accountLink = `/accounts/${this.props.account._id}`
    return (
      <div className="transaction">
        {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
        {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
        <ListGroup>
          <ListGroupItem>Value :&nbsp;
            <span>
              {this.props.transaction.value ? this.props.transaction.value : ''}
              &nbsp;<span className="badge">€</span>
            </span>
          </ListGroupItem>
          <ListGroupItem href={accountLink} >Account : {this.props.account.name ? this.props.account.name : ''}</ListGroupItem>
          <ListGroupItem href={Meteor.user().profile.admin ? `/admin/users/${createdBy._id}` : `/users/${createdBy._id}`}>
            Created by : {createdBy ? createdBy.profile.username : ''}
          </ListGroupItem>
          <ListGroupItem>Created at :&nbsp;
            <IntlProvider locale="en">
              <FormattedDate value={this.props.transaction.createdAt} />
            </IntlProvider>
          </ListGroupItem>
          <ListGroupItem href={Meteor.user().profile.admin ? `/admin/users/${updatedBy._id}` : `/users/${updatedBy._id}`}>
            Updated by : {updatedBy ? updatedBy.profile.username : ''}
          </ListGroupItem>
          <ListGroupItem>Last update at :&nbsp;
            <IntlProvider locale="en">
              <FormattedDate value={this.props.transaction.lastUpdate} />
            </IntlProvider>
          </ListGroupItem>
        </ListGroup>
        {this.state.displayUpdate ? <TransactionUpdate transaction={this.props.transaction} /> : ''}
        <div className="actions">
          <ButtonGroup>
            <Button bsStyle="primary" onClick={this.displayUpdate.bind(this)}>Update</Button>
            <Button bsStyle="danger" onClick={this.deleteTransaction.bind(this)}>Delete</Button>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired
};
