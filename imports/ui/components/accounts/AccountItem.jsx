import React, {PropTypes}             from 'react';
import ReactDOM                       from 'react-dom';
import {ListGroupItem, Modal, Button} from 'react-bootstrap'
import { Meteor }                     from 'meteor/meteor';
import Account                        from '/imports/ui/components/accounts/Account'

export default class AccountItem extends React.Component {
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
    return (
      <ListGroupItem onClick={this.showDetails.bind(this)}>
        {this.props.account.name}
        <span className="badge">{this.props.account.balance} €</span>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.account.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Account account={this.props.account} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ListGroupItem>
    )
  }
}

AccountItem.propTypes = {
  account: PropTypes.object.isRequired,
};
