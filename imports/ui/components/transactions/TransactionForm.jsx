import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert';

export default class TransactionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      name: null,
      value: null,
      checked: null,
      category: null,
      accountId: null
    }
  }

  nameChange(e) {
    this.setState({name: e.target.value.trim()});
  }
  valueChange(e) {
    this.setState({value: e.target.value.trim().replace(",", ".")});
  }
  checkedChange(e) {
    this.setState({checked: e.target.checked});
  }
  categoryChange(e) {
    this.setState({category: e.target.value.trim()});
  }
  accountChange(e) {
    this.setState({account: e.target.value.trim()});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      error: null,
      success: null
    });

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const value = ReactDOM.findDOMNode(this.refs.value).value.trim();
    const category = ReactDOM.findDOMNode(this.refs.categorySelect).value.trim();
    const checked = ReactDOM.findDOMNode(this.refs.checked).checked;
    // Check values
    if (!name || !value || !category) {
      return this.setState({error: "All fields are required !"});
    }
    if (isNaN(value) || value < 0) {
      return this.setState({error: "Value must be a positive number !"});
    }

    // If transaction, accounts props are not null update else create
    if (this.props.transaction && this.props.accountId) {
      const accountId = this.props.accountId;
      const doc = {
        $set: {
          name,
          value,
          checked,
          category,
          accountId
        }
      };

      Meteor.call("updateTransaction", this.props.transaction._id, doc, (err, result) => {
        if (err) {
          console.error("updateTransaction ", err);
          this.setState({error: err.reason});
          return;
        }
        this.setState({success: "Transaction has been updated !"});
        // Clear form
        ReactDOM.findDOMNode(this.refs.name).value = '';
        ReactDOM.findDOMNode(this.refs.value).value = 0;
        ReactDOM.findDOMNode(this.refs.checked).cheked = false;
      });
    } else {
      const accountId = ReactDOM.findDOMNode(this.refs.accountSelect).value.trim();
      Meteor.call("createTransaction", name, value, category, checked, accountId, (err, result) => {
        if (err) {
          console.error("createTransaction ", err);
          this.setState({error: err.reason});
          return;
        }
        this.setState({success: "Transaction has been created !"});
        // Clear form
        ReactDOM.findDOMNode(this.refs.name).value = '';
        ReactDOM.findDOMNode(this.refs.value).value = 0;
        ReactDOM.findDOMNode(this.refs.checked).cheked = false;
      });
    }

  }

  componentWillMount() {
    if (this.props.transaction) {
      this.setState({
        name: this.props.transaction.name,
        value: this.props.transaction.value,
        checked: this.props.transaction.checked,
        category: this.props.transaction.category
      });
    }
    if (this.props.accountId) {
      this.setState({accountId: this.props.accountId})
    }
  }

  render() {
    const accounts = this.props.accounts;
    const categories = ["Other", "Withdrawal", "Hobbies"];
    return (
      <form className="transaction-form panel panel-primary" onSubmit={this.handleSubmit.bind(this)}>
        <div className="panel-heading">
          {this.props.transaction ? `Update ${this.props.transaction.name}`
          : `Add transaction`}
        </div>
        <div className="panel-body">
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          {!this.props.transaction ?
            accounts.length > 0 ?
              <div className="form-group">
                <label htmlFor="accountSelect">Choose an account</label>
                <select ref="accountSelect" id="accountSelect" className="form-control" onChange={this.accountChange.bind(this)} defaultValue={this.state.accountId}>
                  {accounts.map((account) => {
                    return (<option key={account._id} value={account._id}>{account.name}</option>)
                  })}
                </select>
              </div>
            :  <Alert message="You need to create an account before !" type="warning" />
          : ''
          }
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" ref="name" id="name"
              placeholder="Transaction name" value={this.state.name || ''} onChange={this.nameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value <span className="label label-default">€</span></label>
            <input type="text" className="form-control" ref="value"
              id="value" placeholder="Transaction value"
              value={this.state.value || ''} onChange={this.valueChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="categorySelect">Choose a category</label>
            <select ref="categorySelect" id="categorySelect" className="form-control" onChange={this.categoryChange.bind(this)}>
              {categories.map((category) => {
                return (<option key={category} value={category}>{category}</option>)
              })}
            </select>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" ref="checked" onChange={this.checkedChange.bind(this)} checked={this.state.checked ? true : false}/> Checked
            </label>
          </div>
        </div>
        <div className="panel-footer">
          <button type="submit" className="btn btn-success">{this.props.transaction ? 'Save' : 'Add'}</button>
        </div>
      </form>
    )
  }
}

TransactionForm.propTypes = {
  accountId: PropTypes.string,
  accounts: PropTypes.array,
  transaction: PropTypes.object,
};
