import React, {PropTypes}   from 'react';
import ReactDOM             from 'react-dom';
import {ListGroup, Panel}   from 'react-bootstrap';
import { Meteor }           from 'meteor/meteor';
import Alert                from '/imports/ui/components/Alert';
import TransferItem         from '/imports/ui/components/transfers/TransferItem';

export default class TransfersList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let transfers = this.props.transfers;
    return (
      <Panel bsStyle="primary" className="transfers-list" collapsible defaultExpanded header="Transfers List">
        {transfers.length > 0 ?
          <ListGroup fill>
            {transfers.map((transfer) => {
              return <TransferItem key={transfer._id} transfer={transfer} admin={this.props.admin} />
            })}
          </ListGroup>
        :
          <Alert type="warning" message="No transfers found !" />
        }
      </Panel>
    )
  }
}

TransfersList.propTypes = {
  transfers: PropTypes.array.isRequired,
  admin: PropTypes.bool.isRequired
};
