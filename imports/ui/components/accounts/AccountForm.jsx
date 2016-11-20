import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert';

export default class AccountForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      name: null,
      balance: null
    }
  }

  nameChange(e) {
    this.setState({name: e.target.value.trim()});
  }
  balanceChange(e) {
    this.setState({balance: e.target.value.trim()});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      error: null,
      success: null
    });
    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const balance = ReactDOM.findDOMNode(this.refs.balance).value.trim().replace(",", ".");

    if (!balance || !name) {
      return this.setState({error: "All fields are required !"});
    }
    if (isNaN(balance)) {
      return this.setState({error: "Balance must be a number !"});
    }

    // If account props is filled update else create
    if (this.props.account) {
      const doc = {
        $set: {
          name: name,
          balance: balance
        }
      };
      Meteor.call("updateAccount", this.props.account._id, doc, (err, result) => {
        if (err) {
          console.error("updateAccount ", err);
          this.setState({error: err.reason});
          return;
        }
        this.setState({success: "Account has been updated !"});
        // Clear form
        //ReactDOM.findDOMNode(this.refs.name).value = '';
        //ReactDOM.findDOMNode(this.refs.balance).value = 0;
      });
    } else {
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
  }

  componentWillMount() {
    if (this.props.account) {
      this.setState({
        name: this.props.account.name,
        balance: this.props.account.balance
      });
    }
  }

  render() {
    return (
      <form className="account-form panel panel-primary" onSubmit={this.handleSubmit.bind(this)}>
        <div className="panel-heading">
          {this.props.account ? `Update ${this.props.account.name}`
          : `Add account`}
        </div>
        <div className="panel-body">
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" ref="name" id="name"
              placeholder="Account name" value={this.state.name || ''} onChange={this.nameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="balance">Balance</label>
            <input type="text" className="form-control" ref="balance" id="balance"
              placeholder="Account balance" value={this.state.balance || 0} onChange={this.balanceChange.bind(this)} />
          </div>
        </div>
        <div className="panel-footer">
          <button type="submit" className="btn btn-success">{this.props.account ? 'Save' : 'Add'}</button>
        </div>
      </form>
    )
  }
}

AccountForm.propTypes = {
  account: PropTypes.object
};
