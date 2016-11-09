import React                from 'react';
import {Row, Col}           from 'react-bootstrap'
import TransactionsList     from '/imports/ui/components/transactions/TransactionsList'
import TransactionsAdd      from '/imports/ui/components/transactions/TransactionsAdd'

export default class TransactionsPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row className="transactions-page">
        <Col md={6}>
          <TransactionsList />
        </Col>
        <Col md={6}>
          <TransactionsAdd />
        </Col>
      </Row>
    )
  }
}
