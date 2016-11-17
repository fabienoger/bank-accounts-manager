import React                from 'react';
import {Row, Col, Button}   from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import Loading              from '/imports/ui/components/Loading';

export default class AdminTransactionsPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      transactions: Meteor.subscribe("allTransactions")
    }
  }

  componentWillUnmount() {
    this.state.transactions.stop();
  }

  render() {
    if (!this.state.transactions.ready()) {
      return (<Loading />)
    }
    return (
      <Row className="admin-transactions-page">
        <Col md={12}>
        </Col>
      </Row>
    )
  }
}
