import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert';
import Accounts           from '/imports/api/accounts/collection'
import Loading            from '/imports/ui/components/Loading'

export default class TransactionsAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      name: '',
      value: 0
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      error: null,
      success: null
    });

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const value = ReactDOM.findDOMNode(this.refs.value).value.trim().replace(",", ".");
    const accountId = ReactDOM.findDOMNode(this.refs.accountSelect).value.trim();

    // Check values
    if (!name || !value || !accountId) {
      this.setState({error: "All fields are required !"});
      return;
    }
    if (isNaN(value) || value < 0) {
      this.setState({error: "Value must be a positive number !"});
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
    const accounts = this.props.accounts;
    return (
      <form className="transactions-add panel panel-primary" onSubmit={this.handleSubmit.bind(this)}>
        <div className="panel-heading">
          Add transaction
        </div>
        <div className="panel-body">
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          {accounts.length > 0 ?
            <div className="form-group">
              <label htmlFor="accountSelect">Choose an account</label>
              <select ref="accountSelect" id="accountSelect" className="form-control" defaultValue={this.props.accountId}>
                {accounts.map((account) => {
                  return (<option key={account._id} value={account._id}>{account.name}</option>)
                })}
              </select>
            </div>
          :  <Alert message="You need to create an account before !" type="warning" />}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" ref="name" id="name" placeholder="Transaction name" />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value <span className="label label-default">€</span></label>
            <input type="text" className="form-control" ref="value"
              id="value" placeholder="Transaction value" />
          </div>
        </div>
        <div className="panel-footer">
          {accounts.length > 0 ?
            <button type="submit" className="btn btn-success">Add</button>
          :
            <button type="submit" className="btn btn-success disabled">Add</button>
          }
        </div>
      </form>
    )
  }
}
TransactionsAdd.propTypes = {
  accounts: PropTypes.array.isRequired,
};
