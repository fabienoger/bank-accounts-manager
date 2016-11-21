import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert';
import AccountSelect      from '/imports/ui/components/AccountSelect';

export default class TransferForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      name: null,
      value: null,
      checked: null,
      fromAccount: null,
      toAccount: null
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
  fromAccountChange(e) {
    console.log(" e.target.value.trim() ", e.target.value.trim());
    this.setState({fromAccount: e.target.value.trim()});
  }
  toAccountChange(e) {
    console.log(" e.target.value.trim() ", e.target.value.trim());
    this.setState({toAccount: e.target.value.trim()});
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
    const fromAccountId = ReactDOM.findDOMNode(this.refs.fromAccount).value.trim();
    const toAccountId = ReactDOM.findDOMNode(this.refs.toAccount).value.trim();
    const checked = ReactDOM.findDOMNode(this.refs.checked).checked;
    // Check values
    if (!name || !value || !fromAccountId || !toAccountId) {
      return this.setState({error: "All fields are required !"});
    }
    if (isNaN(value) || value < 0) {
      return this.setState({error: "Value must be a positive number !"});
    }

    // If transfer, accounts props are not null update else create
    if (this.props.transfer && this.props.accountId) {
      const accountId = this.props.accountId;
      const doc = {
        $set: {
          name,
          value,
          checked,
          fromAccountId,
          toAccountId
        }
      };

      Meteor.call("updateTransfer", this.props.transfer._id, doc, (err, result) => {
        if (err) {
          console.error("updateTransfer ", err);
          this.setState({error: err.reason});
          return;
        }
        this.setState({success: "Transfer has been updated !"});
        // Clear form
        ReactDOM.findDOMNode(this.refs.name).value = '';
        ReactDOM.findDOMNode(this.refs.value).value = 0;
        ReactDOM.findDOMNode(this.refs.checked).cheked = false;
      });
    } else {
      const accountId = ReactDOM.findDOMNode(this.refs.accountSelect).value.trim();
      Meteor.call("createTransfer", name, value, category, checked, accountId, (err, result) => {
        if (err) {
          console.error("createTransfer ", err);
          this.setState({error: err.reason});
          return;
        }
        this.setState({success: "Transfer has been created !"});
        // Clear form
        ReactDOM.findDOMNode(this.refs.name).value = '';
        ReactDOM.findDOMNode(this.refs.value).value = 0;
        ReactDOM.findDOMNode(this.refs.checked).cheked = false;
      });
    }

  }

  componentWillMount() {
    if (this.props.transfer) {
      this.setState({
        name: this.props.transfer.name,
        value: this.props.transfer.value,
        checked: this.props.transfer.checked,
        toAccount: this.props.transfer.toAccountId,
        fromAccount: this.props.transfer.fromAccountId
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
      <form className="transfer-form panel panel-primary" onSubmit={this.handleSubmit.bind(this)}>
        <div className="panel-heading">
          {this.props.transfer ? `Update ${this.props.transfer.name}`
          : `Add transfer`}
        </div>
        <div className="panel-body">
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          {!this.props.transfer ?
            accounts.length > 0 ?
              [<AccountSelect key="1" label="Select the account to be debited"
                selectChange={this.fromAccountChange.bind(this)}
                accounts={accounts} ref="fromAccount" defaultValue={accounts[0]._id} />,
              <AccountSelect key="2" label="Select the account to be credited"
                selectChange={this.toAccountChange.bind(this)}
                accounts={accounts} ref="toAccount" />]
            :  <Alert message="You need to create an account before !" type="warning" />
          : ''
          }
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" ref="name" id="name"
              placeholder="Transfer name" value={this.state.name || ''} onChange={this.nameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value <span className="label label-default">€</span></label>
            <input type="text" className="form-control" ref="value"
              id="value" placeholder="Transfer value"
              value={this.state.value || ''} onChange={this.valueChange.bind(this)} />
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" ref="checked" onChange={this.checkedChange.bind(this)} checked={this.state.checked ? true : false}/> Checked
            </label>
          </div>
        </div>
        <div className="panel-footer">
          <button type="submit" className="btn btn-success">{this.props.transfer ? 'Save' : 'Add'}</button>
        </div>
      </form>
    )
  }
}

TransferForm.propTypes = {
  fromAccountId: PropTypes.string,
  toAccountId: PropTypes.string,
  accounts: PropTypes.array,
  transfer: PropTypes.object,
};
