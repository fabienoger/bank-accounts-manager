import React, {PropTypes}       from 'react';
import {Row, Col}               from 'react-bootstrap'
import AccountTransactionsList  from '/imports/ui/components/accounts/AccountTransactionsList'
import TransactionsAdd          from '/imports/ui/components/transactions/TransactionsAdd'

export default class AccountPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row className="accounts-page">
        <Col md={6}>
          <AccountTransactionsList accountId={this.props.accountId} />
        </Col>
        <Col md={6}>
          <TransactionsAdd accountId={this.props.accountId}/>
        </Col>
      </Row>
    )
  }
}

AccountPage.propTypes = {
  accountId: PropTypes.string.isRequired,
};
