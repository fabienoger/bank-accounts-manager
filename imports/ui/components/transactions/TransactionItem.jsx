import React, {PropTypes}             from 'react';
import ReactDOM                       from 'react-dom';
import {Label, Modal, Button}         from 'react-bootstrap';
import { Meteor }                     from 'meteor/meteor';
import Transaction                    from '/imports/ui/components/transactions/Transaction';
import Loading                        from '/imports/ui/components/Loading';
import Accounts                       from '/imports/api/accounts/collection';
import {FormattedDate, IntlProvider}  from 'react-intl';

export default class TransactionItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }

  // Display details modal
  showDetails() {
    this.setState({showModal: true});
  }

  render() {
    const account = Accounts.findOne({_id: this.props.transaction.accountId});
    let createdBy = '';
    if (this.props.admin) {
      createdBy = Meteor.users.findOne({_id: this.props.transaction.createdBy})
    }
    return (
      <li className="list-group-item" onClick={this.showDetails.bind(this)} style={{cursor: 'pointer'}}>
        <h4 className="list-group-item-heading">
          {account ?
            <span className="label label-success">{account.name}</span>
          : <Loading />}
        </h4>
        <p className="list-group-item-text">
          {this.props.transaction.name} -&nbsp;
          {this.props.admin ?
            `${createdBy.profile.username}`
          :
            <IntlProvider locale="en">
              <FormattedDate value={this.props.transaction.lastUpdate} />
            </IntlProvider>
          }
          <span className="badge pull-right">{this.props.transaction.value} €</span>
        </p>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.transaction.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {account ?
            <Transaction transaction={this.props.transaction} account={account} admin={this.props.admin} /> :
            <Loading />
          }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </li>
    )
  }
}

TransactionItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired
};
