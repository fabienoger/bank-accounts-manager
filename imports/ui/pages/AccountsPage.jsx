import React                from 'react';
import {Row, Col}           from 'react-bootstrap'
import AccountsList         from '/imports/ui/components/accounts/AccountsList'
import AccountsAdd          from '/imports/ui/components/accounts/AccountsAdd'

export default class AccountsPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row className="accounts-page">
        <Col md={6}>
          <AccountsList />
        </Col>
        <Col md={6}>
          <AccountsAdd />
        </Col>
      </Row>
    )
  }
}
