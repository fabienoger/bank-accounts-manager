import React        from 'react';
import ReactDOM     from 'react-dom';
import {Row, Col}   from 'react-bootstrap'
import { Meteor }   from 'meteor/meteor';
import Alert        from '/imports/ui/components/Alert'

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    const confirmPassword = ReactDOM.findDOMNode(this.refs.confirmPassword).value.trim();

    if (!username || !email || !password || !confirmPassword) {
      this.setState({error: "All fields are required !"});
      return;
    }
    if (password != confirmPassword) {
      this.setState({error: "Password must be equals !"});
      return;
    }
    if (!Modules.both.utils.checkEmail(email)) {
      this.setState({error: "Invalid email !"});
      return;
    }
    // Define user object
    const user = {
      email: email,
      password: password,
      profile:
      {
        language: "fr",
        username: username,
        active: true,
        admin: false
      }
    };

    Accounts.createUser(user, function(err) {
      if (err) {
        console.error("createUser", err);
        return this.setState({error: err.reason});
      }
      FlowRouter.go('home');
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
        <div className="form-group">
          <label htmlFor="register-username">Username</label>
          <input type="text" className="form-control" ref="username" id="register-username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="register-email">Email</label>
          <input type="email" className="form-control" ref="email" id="register-email" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Password</label>
          <input type="password" className="form-control" ref="password" id="register-password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="register-confirm-password">Confirm password</label>
          <input type="password" className="form-control" ref="confirmPassword" id="register-confirm-password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    )
  }
}
