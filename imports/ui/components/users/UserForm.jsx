import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import {Button}           from 'react-bootstrap';
import Alert              from '/imports/ui/components/Alert';
import Loading            from '/imports/ui/components/Loading';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      username: '',
      active: true,
      language: '',
      admin: false,
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
  componentDidMount() {
    if (this.props.user) {
      this.setState({
        username: this.props.user.profile.username || '',
        active: this.props.user.profile.active || true,
        language: this.props.user.profile.language || '',
        admin: this.props.user.profile.admin || false,
        email: this.props.user.emails[0].address || ''
      });
    }
  }

  usernameChange(e) {
    this.setState({username: e.target.value.trim()});
  }
  emailChange(e) {
    this.setState({email: e.target.value.trim()});
  }
  activeChange(e) {
    this.setState({active: e.target.checked});
  }
  adminChange(e) {
    this.setState({admin: e.target.checked});
  }
  languageChange(e) {
    this.setState({language: e.target.value.trim()});
  }
  passwordChange(e) {
    this.setState({password: e.target.value.trim()});
  }
  confirmPasswordChange(e) {
    this.setState({confirmPassword: e.target.value.trim()});
  }

  handleSubmit(e) {
    e.preventDefault();
    // Set error and success state to null
    this.setState({
      error: null,
      success: null
    });

    // Find the text field via the React ref
    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const active = ReactDOM.findDOMNode(this.refs.active).checked;
    const language = ReactDOM.findDOMNode(this.refs.language).value.trim();
    const admin = ReactDOM.findDOMNode(this.refs.admin).checked;
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    const confirmPassword = ReactDOM.findDOMNode(this.refs.confirmPassword).value.trim();

    // Check if fields are not empty
    if (!username || !email || !language) {
      return this.setState({error: "All fields are required !"});
    }
    // Email validation
    if (!Modules.both.utils.checkEmail(email)) {
      return this.setState({error: "Invalid email !"});
    }
    // If user props is not define create User else update
    if (!this.props.user) {
      // Check if passwords are not empty
      if (!password || !confirmPassword) {
        return this.setState({error: "All fields are required !"});
      }
      // Check if passwords are equals
      if (password != confirmPassword) {
        return this.setState({error: "Passwords must be equals !"});
      }

      const userObject = {
        email,
        password,
        profile: {
          username,
          language,
          active,
          admin
        }
      };
      Meteor.call("createNewUser", userObject, (err, result) => {
        if (err) {
          console.error("createNewUser", err);
          return this.setState({error: err.reason});
        }
        this.setState({success: "The user was successfully created !"});
        this.props.closeUserModal();
      });
    } else {
      // Check if passwords fields are not blank then set new password
      if (password && confirmPassword && password == confirmPassword) {
        Meteor.call("setPassword", this.props.user._id, password, (err) => {
          if (err) {
            console.error("setPassword ", err);
            return this.setState({error: err.reason});
          }
          this.setState({success: "Password was successfully updated !"});
        });
      }
      const doc = {
        $set: {
          profile: {
            username: username,
            active: active,
            language: language,
            admin: admin
          },
          'emails.0.address': email
        }
      };
      Meteor.call("updateUser", this.props.user._id, doc, (err, result) => {
        if (err) {
          console.error("updateUser ", err);
          return this.setState({error: err.reason});
        }
        this.setState({success: "User was successfully updated !"});
        this.props.closeUserModal();
      });
    }
  }

  render() {
    return (
      <div className="user-form">
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" ref="username" id="username"
              placeholder="Username" value={this.state.username} onChange={this.usernameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" ref="email" id="email"
              placeholder="Email" value={this.state.email} onChange={this.emailChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password (leave blank if you don't want update)</label>
            <input type="password" className="form-control" ref="password" id="password"
              placeholder="Password" value={this.state.password} onChange={this.passwordChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password (leave blank if you don't want update)</label>
            <input type="password" className="form-control" ref="confirmPassword" id="confirmPassword"
              placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.confirmPasswordChange.bind(this)} />
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" ref="active" onChange={this.activeChange.bind(this)} checked={this.state.active ? true : false}/> Active
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" ref="admin" onChange={this.adminChange.bind(this)} checked={this.state.admin ? true : false}/> Admin
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select ref="language" id="language" className="form-control" onChange={this.languageChange.bind(this)} defaultValue={this.state.language}>
              <option value="fr">French</option>
              <option value="en">English</option>
            </select>
          </div>
            <Button type="submit" bsStyle="success">{this.props.user ? 'Save' : 'Add'}</Button>
        </form>
      </div>
    )
  }
}

UserForm.propTypes = {
  user: PropTypes.object,
};
