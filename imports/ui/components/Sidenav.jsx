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
      FlowRouter.go('/');
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
            <NavItem eventKey={1} href="/accounts">Accounts</NavItem>
            <NavItem eventKey={2} href="/transactions">Transactions</NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={1} title={this.state.user ? this.state.user.profile.username : 'Login'} id="basic-nav-dropdown">
              {this.state.user ?
                <MenuItem eventKey={1.3} href="/user">Profile</MenuItem> :
                <MenuItem eventKey={1.3} href="/login">Sign In</MenuItem>
              }
              <MenuItem divider />
              {this.state.user ?
                <MenuItem eventKey={1.3} onClick={() => this.logout()}>Sign Out</MenuItem> :
                <MenuItem eventKey={1.3} href="/register">Sign Up</MenuItem>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
