import React                                          from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem}  from 'react-bootstrap'
import { Meteor }                                     from 'meteor/meteor';

export default class Sidenav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    Meteor.subscribe('users', (err, res) => {
      this.setState({user: Meteor.users.findOne({_id: Meteor.userId()})});
      Tracker.autorun(() => {
         const userId = Meteor.userId()
         this.setState({user: Meteor.users.findOne({_id: Meteor.userId()})});
      });
    })
  }

  logout() {
    Meteor.logout((err) => {
      if (err) {
        return console.error("Meteor.logout ", err);
      }
      this.setState({user: null});
      FlowRouter.go('/login');
    });
  }

  render() {
    const AppContainer = (props) => (
      <li><a href="#">{props.main}</a></li>
    );
    return (
      <Navbar inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">BAM</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.state.user ?
              [<NavItem key={1} eventKey={1} href="/accounts">Accounts</NavItem>,
              <NavItem key={2} eventKey={2} href="/transactions">Transactions</NavItem>]
            : '' }
            {this.state.user ?
              this.state.user.profile.admin ?
                <NavDropdown eventKey={1} title="Admin" id="basic-nav-dropdown">
                  <MenuItem eventKey={1.1} href="/admin">Admin</MenuItem>
                  <MenuItem eventKey={1.2} href="/admin/users">Users</MenuItem>
                  <MenuItem eventKey={1.3} href="/admin/accounts">Accounts</MenuItem>
                  <MenuItem eventKey={1.4} href="/admin/transactions">Transactions</MenuItem>
                </NavDropdown>
              : ''
            : ''
            }
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={2} title={this.state.user ? this.state.user.profile.username : 'Login'} id="basic-nav-dropdown">
              {this.state.user ?
                <MenuItem eventKey={2.1} href="/profile">Profile</MenuItem> :
                <MenuItem eventKey={2.1} href="/login">Sign In</MenuItem>
              }
              <MenuItem divider />
              {this.state.user ?
                <MenuItem eventKey={2.2} onClick={() => this.logout()}>Sign Out</MenuItem> :
                <MenuItem eventKey={2.2} href="/register">Sign Up</MenuItem>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
