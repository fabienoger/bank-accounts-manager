import React              from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert';
import Accounts           from '/imports/api/accounts/collection'
import TrackerReact       from 'meteor/ultimatejs:tracker-react'
import Loading            from '/imports/ui/components/Loading'

export default class TransactionsAdd extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      name: '',
      value: 0,
      accounts: Meteor.subscribe("userAccounts", Meteor.userId())
    }
  }

  componentWillUnmount() {
    this.state.accounts.stop();
  }

  getAccounts() {
    return Accounts.find().fetch();
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const value = ReactDOM.findDOMNode(this.refs.value).value.trim();
    const accountId = ReactDOM.findDOMNode(this.refs.accountSelect).value.trim();

    // Check values
    if (!name || !value || !accountId) {
      this.setState({error: "All fields are required !"});
      return;
    }
    if (isNaN(value)) {
      this.setState({error: "Value must be a number !"});
      return;
    }
    Meteor.call("createTransaction", name, value, accountId, (err, result) => {
      if (err) {
        console.error("createTransaction ", err);
        this.setState({error: err.reason});
        return;
      }
      this.setState({success: "Transaction has been created !"});
      // Clear form
      ReactDOM.findDOMNode(this.refs.name).value = '';
      ReactDOM.findDOMNode(this.refs.value).value = 0;
    });
  }

  render() {
    let accounts = this.getAccounts();
    return (
      <div className="transactions-add">
        <div className="page-header">
          <h2>Add transaction</h2>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          {this.state.accounts.ready() ?
            <div className="form-group">
              <label htmlFor="accountSelect">Choose an account</label>
              <select ref="accountSelect" id="accountSelect" className="form-control">
                {accounts.map((account) => {
                  return (<option key={account._id} value={account._id}>{account.name}</option>)
                })}
              </select>
            </div>
          : <Loading />}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" ref="name" id="name" placeholder="Transaction name" />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value <span className="label label-default">€</span></label>
            <input type="text" className="form-control" ref="value"
              id="value" placeholder="Transaction value" />
          </div>
          <button type="submit" className="btn btn-success">Add</button>
        </form>
      </div>
    )
  }
}
