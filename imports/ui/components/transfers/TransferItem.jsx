import React, {PropTypes}             from 'react';
import ReactDOM                       from 'react-dom';
import {Label, Modal, Button}         from 'react-bootstrap';
import { Meteor }                     from 'meteor/meteor';
import Transfer                       from '/imports/ui/components/transfers/Transfer';
import Loading                        from '/imports/ui/components/Loading';
import Accounts                       from '/imports/api/accounts/collection';
import {FormattedDate, IntlProvider}  from 'react-intl';

export default class TransferItem extends React.Component {
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
    const account = Accounts.findOne({_id: this.props.transfer.accountId});
    let createdBy = '';
    if (this.props.admin) {
      createdBy = Meteor.users.findOne({_id: this.props.transfer.createdBy})
    }
    return (
      <li className="list-group-item" onClick={this.showDetails.bind(this)} style={{cursor: 'pointer'}}>
        <h4 className="list-group-item-heading">
          {account ?
            <span className="label label-success">{account.name}</span>
          : <Loading />}
        </h4>
        <p className="list-group-item-text">
          {this.props.transfer.name} -&nbsp;
          {this.props.admin ?
            `${createdBy.profile.username}`
          :
            <IntlProvider locale="en">
              <FormattedDate value={this.props.transfer.lastUpdate} />
            </IntlProvider>
          }
          <span className="badge pull-right">{this.props.transfer.value} €</span>
        </p>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.transfer.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {account ?
            <Transfer transfer={this.props.transfer} account={account} admin={this.props.admin} /> :
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

TransferItem.propTypes = {
  transfer: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired
};
