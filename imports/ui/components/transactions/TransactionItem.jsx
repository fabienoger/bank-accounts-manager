import React, {PropTypes}             from 'react';
import ReactDOM                       from 'react-dom';
import {ListGroupItem, Modal, Button} from 'react-bootstrap'
import { Meteor }                     from 'meteor/meteor';
import Transaction                    from '/imports/ui/components/transactions/Transaction'
import Loading                        from '/imports/ui/components/Loading'
import Accounts                       from '/imports/api/accounts/collection'

export default class TransactionItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      accounts: Meteor.subscribe("accounts")
    }
  }

  componentWillUnmount() {
    this.state.accounts.stop();
  }

  getAccount(id) {
    return Accounts.findOne({_id: id});
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
    const account = this.getAccount(this.props.transaction.accountId);
    return (
      <ListGroupItem onClick={this.showDetails.bind(this)}>
        {account ?
          <span className="label label-success">{account.name}</span>
        : <Loading />}
        &nbsp;{this.props.transaction.name}
        <span className="badge">{this.props.transaction.value} €</span>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.transaction.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Transaction transaction={this.props.transaction} account={account} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ListGroupItem>
    )
  }
}

TransactionItem.propTypes = {
  transaction: PropTypes.object.isRequired,
};
