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
      toAccount: null,
      toAccountList: []
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

  // Return Array of accounts without _id
  accountListWithoutId(accounts, accountId) {
    if (!accounts) {
      return [];
    }
    if (!accountId) {
      return accounts;
    }
    return _.without(accounts, _.findWhere(accounts, {_id: accountId}));
  }

  fromAccountChange(e) {
    const fromAccountId = e.target.value.trim();
    const toAccountList = this.accountListWithoutId(this.props.accounts, fromAccountId);
    this.setState({
      fromAccountId,
      toAccountList
    });
  }
  toAccountChange(e) {
    this.setState({toAccount: e.target.value.trim()});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      error: null,
      success: null
    });

    // Find the text field via the React ref & state
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const value = ReactDOM.findDOMNode(this.refs.value).value.trim();
    const checked = ReactDOM.findDOMNode(this.refs.checked).checked;
    const fromAccountId = this.state.fromAccountId;
    const toAccountId = this.state.toAccountId;
    // Check values
    if (!name || !value || !fromAccountId || !toAccountId) {
      return this.setState({error: "All fields are required !"});
    }
    if (isNaN(value) || value < 0) {
      return this.setState({error: "Value must be a positive number !"});
    }
    // Check if the accounts are different
    if (fromAccountId == toAccount) {
      return this.setState({error: "Recipient account and sender account must be different !"});
    }

    // If transfer, accounts props are not null update else create
    if (this.props.transfer) {
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
          return this.setState({error: err.reason});
        }
        this.setState({success: "Transfer has been updated !"});
      });
    } else {
      Meteor.call("createTransfer", name, value, checked, fromAccountId, toAccountId, (err, result) => {
        if (err) {
          console.error("createTransfer ", err);
          return this.setState({error: err.reason});
        }
        this.setState({
          success: "Transfer has been created !",
          name: '',
          value: 0,
          checked: false
        });
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
    if (this.props.fromAccountId) {
      this.setState({
        fromAccountId: this.props.fromAccountId,
        toAccountList: this.accountListWithoutId(this.props.accounts, this.props.transfer.fromAccountId)
      })
    } else if (this.props.accounts.length > 1) {
      this.setState({
        fromAccountId: this.props.accounts[0]._id,
        toAccountList: this.accountListWithoutId(this.props.accounts, this.props.accounts[0]._id)
      })
    }
    if (this.props.toAccountId) {
      this.setState({toAccountId: this.props.toAccountId})
    } else if (this.props.accounts.length > 1) {
      this.setState({toAccountId: this.props.accounts[1]._id})
    }
  }

  render() {
    const accounts = this.props.accounts;
    const toAccountList = this.accountListWithoutId(this.props.accounts, this.state.fromAccountId);
    if (accounts.length < 2) {
      return (<Alert message="You need to create an account before !" type="warning" />)
    }
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
                accounts={accounts} ref="fromAccount" defaultValue={this.state.fromAccountId} />,
              <AccountSelect key="2" label="Select the account to be credited"
                selectChange={this.toAccountChange.bind(this)}
                accounts={toAccountList} ref="toAccount" defaultValue={this.state.toAccountId} />]
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
  accounts: PropTypes.array.isRequired,
  transfer: PropTypes.object,
};
