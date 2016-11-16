import React        from 'react';
import ReactDOM     from 'react-dom';
import { Meteor }   from 'meteor/meteor';
import Alert        from '/imports/ui/components/Alert'

export default class UpdatePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // Empty error / success state
    this.setState({
      error: null,
      success: null
    })
    // Find the text field via the React ref
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    const newPassword = ReactDOM.findDOMNode(this.refs.newPassword).value.trim();
    const confirmNewPassword = ReactDOM.findDOMNode(this.refs.confirmNewPassword).value.trim();

    // Check fields
    if (!password || !newPassword || !confirmNewPassword) {
      this.setState({error: "All fields are required !"});
      return;
    }
    if (newPassword != confirmNewPassword) {
      this.setState({error: "New passwords must be equals !"});
      return;
    }
    // Change password
    Accounts.changePassword(password, newPassword, (error, result) => {
      if (error) {
        console.error("Accounts.changePassword ", error);
        // Incorrect Password
        if (error.error == 403) {
          this.setState({error: "Wrong password !"});
        }
        return;
      }
      this.setState({success: "Your password been updated !"});
      // Clear form
      ReactDOM.findDOMNode(this.refs.password).value = '';
      ReactDOM.findDOMNode(this.refs.newPassword).value = '';
      ReactDOM.findDOMNode(this.refs.confirmNewPassword).value = '';
    });
  }

  render() {
    return (
      <form className="update-password panel panel-primary" onSubmit={this.handleSubmit.bind(this)}>
        <div className="panel-heading">Update password</div>
        <div className="panel-body">
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" ref="password" id="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New password</label>
            <input type="password" className="form-control" ref="newPassword" id="new-password" placeholder="New password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-new-password">Confirm new password</label>
            <input type="password" className="form-control" ref="confirmNewPassword" id="confirm-new-password" placeholder="Confirm new password" />
          </div>
        </div>
        <div className="panel-footer">
          <button type="submit" className="btn btn-success">Update password</button>
        </div>
      </form>
    )
  }
}
