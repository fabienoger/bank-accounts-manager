import React                from 'react';
import {Row, Col}           from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import AccountsList         from '/imports/ui/components/accounts/AccountsList';
import AccountForm          from '/imports/ui/components/accounts/AccountForm';
import Accounts             from '/imports/api/accounts/collection';
import Loading              from '/imports/ui/components/Loading';

export default class AccountsPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      accounts: Meteor.subscribe("userAccounts", Meteor.userId())
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
      <Row className="accounts-page">
        <Col md={6}>
          <AccountsList accounts={accounts} admin={false} />
        </Col>
        <Col md={6}>
          <AccountForm />
        </Col>
      </Row>
    )
  }
}
