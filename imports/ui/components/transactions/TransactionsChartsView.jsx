import React, {PropTypes}   from 'react';
import {Button, Modal, Col} from 'react-bootstrap';
import Loading              from '/imports/ui/components/Loading';
import TransactionsChart    from '/imports/ui/components/transactions/TransactionsChart';

export default class TransactionsChartsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    const transactions = this.props.transactions;
    const style = {
      marginBottom: '15px'
    };
    return (
      <Col md={12} className="transactions-charts-view" style={style}>
        <Button bsStyle="primary" onClick={this.toggleModal.bind(this)}>
          DataViz&nbsp;
          <span className="glyphicon glyphicon-signal" aria-hidden="true"></span>
        </Button>
        <Modal show={this.state.showModal} onHide={this.toggleModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Transactions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TransactionsChart transactions={transactions} chartType="donut" />
            <TransactionsChart transactions={transactions} chartType="timeseries" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Col>
    )
  }
}

TransactionsChartsView.propTypes = {
  transactions: PropTypes.array.isRequired
};
