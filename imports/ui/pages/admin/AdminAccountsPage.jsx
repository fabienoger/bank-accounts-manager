import React                from 'react';
import {Row, Col, Button}   from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import Loading              from '/imports/ui/components/Loading';
import Accounts             from '/imports/api/accounts/collection';
import AccountsList         from '/imports/ui/components/accounts/AccountsList';

export default class AdminAccountsPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      accounts: Meteor.subscribe("allAccounts")
    }
  }

  componentWillUnmount() {
    this.state.accounts.stop();
  }

  render() {
    if (!this.state.accounts.ready()) {
      return (<Loading />)
    }
    const accounts = Accounts.find({}).fetch();
    return (
      <Row className="admin-accounts-page">
        <Col md={6}>
          <AccountsList accounts={accounts} admin={true} />
        </Col>
        <Col md={6}>
        </Col>
      </Row>
    )
  }
}
