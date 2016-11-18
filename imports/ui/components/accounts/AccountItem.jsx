import React, {PropTypes}             from 'react';
import ReactDOM                       from 'react-dom';
import {Modal, Button, Label}         from 'react-bootstrap';
import { Meteor }                     from 'meteor/meteor';
import Account                        from '/imports/ui/components/accounts/Account';
import {FormattedDate, IntlProvider}  from 'react-intl';

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
    let createdBy = '';
    if (this.props.admin) {
      createdBy = Meteor.users.findOne({_id: this.props.account.createdBy})
    }
    return (
      <li className="list-group-item" onClick={this.showDetails.bind(this)} style={{cursor: 'pointer'}}>
        <h4 className="list-group-item-heading">{this.props.account.name} <span className="badge pull-right">{this.props.account.balance} €</span></h4>
        <p className="list-group-item-text">
          {this.props.admin ?
            `${createdBy.profile.username}`
          :
            <IntlProvider locale="en">
              <FormattedDate value={this.props.account.lastUpdate} />
            </IntlProvider>
          }
          {this.props.account.active ?
            <Label className="pull-right" bsStyle="success">Enabled</Label>
          :
            <Label className="pull-right" bsStyle="warning">Disabled</Label>
          }
        </p>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.account.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Account account={this.props.account} admin={this.props.admin} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </li>
    )
  }
}

AccountItem.propTypes = {
  account: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired
};
