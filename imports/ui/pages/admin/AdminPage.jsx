import React                from 'react';
import {Row, Col}           from 'react-bootstrap';
import TrackerReact         from 'meteor/ultimatejs:tracker-react';
import UsersList            from '/imports/ui/components/users/UsersList';
import Loading              from '/imports/ui/components/Loading';

export default class AdminPage extends TrackerReact(React.Component) {
  constructor(props) {
    super(props),
    this.state = {
      accounts: Meteor.subscribe("accounts"),
      transactions: Meteor.subscribe("transactions"),
      users: Meteor.subscribe("users")
    }
  }

  componentWillUnmount() {
    this.state.accounts.stop();
    this.state.transactions.stop();
    this.state.users.stop();
  }

  render() {
    if (!this.state.accounts.ready() || !this.state.transactions.ready() || !this.state.users.ready()) {
      return (<Loading />)
    }
    if (!Meteor.user().profile.admin) {
      FlowRouter.go('/');
    }
    const users = Meteor.users.find({}).fetch();
    return (
      <Row className="admin-page">
        <Col md={4}>
          <div className="page-header"><a href="/admin/users">Users</a></div>
          <UsersList users={users} />
        </Col>
        <Col md={4}>
          <div className="page-header"><a href="/admin/accounts">Accounts</a></div>
        </Col>
        <Col md={4}>
          <div className="page-header"><a href="/admin/transactions">Transactions</a></div>
        </Col>
      </Row>
    )
  }
}
