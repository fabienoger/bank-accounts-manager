import React, {PropTypes}             from 'react';
import ReactDOM                       from 'react-dom';
import {ListGroupItem, Modal, Button} from 'react-bootstrap'
import { Meteor }                     from 'meteor/meteor';
import TrackerReact                   from 'meteor/ultimatejs:tracker-react'
import Transaction                    from '/imports/ui/components/transactions/Transaction'
import Loading                        from '/imports/ui/components/Loading'
import Accounts                       from '/imports/api/accounts/collection'

export default class TransactionItem extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      account: Meteor.subscribe("account", Meteor.userId(), this.props.transaction.accountId)
    }
  }

  componentWillUnmount() {
    this.state.account.stop();
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
          {account ?
            <Transaction transaction={this.props.transaction} account={account} /> :
            <Loading />
          }
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
