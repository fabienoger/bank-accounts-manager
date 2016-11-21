import React, {PropTypes}   from 'react';
import {Row, Col}           from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import Accounts             from '/imports/api/accounts/collection';
import Transfers            from '/imports/api/transfers/collection';
import TransfersList        from '/imports/ui/components/transfers/TransfersList';
import TransferForm         from '/imports/ui/components/transfers/TransferForm';
import Loading              from '/imports/ui/components/Loading';

export default class TransfersPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      transfers: Meteor.subscribe("userTransfers", Meteor.userId()),
      accounts: Meteor.subscribe("userAccounts", Meteor.userId())
    }
  }

  componentWillUnmount() {
    this.state.transfers.stop();
    this.state.accounts.stop();
  }

  render() {
    if (!this.state.transfers.ready() || !this.state.accounts.ready()) {
      return (<Loading />)
    }
    const transfers = Transfers.find({}).fetch();
    const accounts = Accounts.find({}).fetch();
    return (
      <Row className="transfers-page">
        <Col md={6}>
          <TransfersList transfers={transfers} admin={false} />
        </Col>
        <Col md={6}>
          <TransferForm accounts={accounts} />
        </Col>
      </Row>
    )
  }
}

TransfersPage.propTypes = {
  admin: PropTypes.bool.isRequired
};
