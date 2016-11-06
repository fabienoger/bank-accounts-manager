import React                from 'react';
import {Row, Col}           from 'react-bootstrap'
import UpdatePassword       from '/imports/ui/components/UpdatePassword'
import AccountInformations  from '/imports/ui/components/AccountInformations'

export default class UserPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row className="user-page">
        <Col md={6}>
          <AccountInformations />
        </Col>
        <Col md={6}>
          <UpdatePassword />
        </Col>
      </Row>
    )
  }
}
