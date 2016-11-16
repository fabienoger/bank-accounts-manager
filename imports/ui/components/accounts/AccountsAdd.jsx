import React              from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert';

export default class AccountsAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      name: '',
      balance: 0
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const balance = ReactDOM.findDOMNode(this.refs.balance).value.trim().replace(",", ".");

    // Check values
    if (!name || !balance) {
      this.setState({error: "All fields are required !"});
      return;
    }
    if (isNaN(balance)) {
      this.setState({error: "Balance must be a number !"});
      return;
    }
    Meteor.call("createAccount", name, balance, (err, result) => {
      if (err) {
        console.error("createAccount ", err);
        this.setState({error: err.reason});
        return;
      }
      this.setState({success: "Account has been created !"});
      // Clear form
      ReactDOM.findDOMNode(this.refs.name).value = '';
      ReactDOM.findDOMNode(this.refs.balance).value = 0;
    });
  }

  render() {
    return (
      <form className="accounts-add panel panel-primary" onSubmit={this.handleSubmit.bind(this)}>
        <div className="panel-heading">Add account</div>
        <div className="panel-body">
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" ref="name" id="name" placeholder="Account name" />
          </div>
          <div className="form-group">
            <label htmlFor="balance">Balance <span className="label label-default">€</span></label>
            <input type="text" className="form-control" ref="balance"
              id="balance" placeholder="Account balance" />
          </div>
        </div>
        <div className="panel-footer">
          <button type="submit" className="btn btn-success">Add</button>
        </div>
      </form>
    )
  }
}
