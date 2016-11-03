import React        from 'react';
import ReactDOM     from 'react-dom';
import {Row, Col}   from 'react-bootstrap'
import { Meteor }   from 'meteor/meteor';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    console.log("event ", event);
    console.log("email ", email);
    console.log("password ", password);
    // Clear form
    //ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input type="email" className="form-control" ref="email" id="login-email" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input type="password" className="form-control" ref="password" id="login-password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-success">Login</button>
        <a href="/register" className="pull-right">Register</a>
      </form>
    )
  }
}
