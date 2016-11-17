import React        from 'react';
import ReactDOM     from 'react-dom';
import {Row, Col}   from 'react-bootstrap'
import { Meteor }   from 'meteor/meteor';
import Alert        from '/imports/ui/components/Alert'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({error: null});

    // Find the text field via the React ref
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    if (!email || !password) {
      this.setState({error: "All fields are required !"});
      return;
    }
    if (!Modules.both.utils.checkEmail(email)) {
      this.setState({error: "Invalid email !"});
      return;
    }

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        console.error("loginWithPassword", err);
        return this.setState({error: err.reason});
      }
      FlowRouter.go('home');
    });
    // Clear form
    //ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
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
