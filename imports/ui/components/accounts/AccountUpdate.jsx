import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert';

export default class AccountUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      name: this.props.account.name,
      balance: this.props.account.balance
    }
  }

  nameChange(e) {
    this.setState({name: e.target.value.trim()});
  }

  balanceChange(e) {
    this.setState({balance: e.target.value.trim()});
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const balance = ReactDOM.findDOMNode(this.refs.balance).value.trim();

    // Check values
    if (!name || !balance) {
      this.setState({error: "All fields are required !"});
      return;
    }
    if (isNaN(balance)) {
      this.setState({error: "Balance must be a number !"});
      return;
    }
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
      this.setState({success: "Account has been created !"});
      // Clear form
      ReactDOM.findDOMNode(this.refs.name).value = '';
      ReactDOM.findDOMNode(this.refs.balance).value = 0;
    });
  }

  render() {
    return (
      <div className="account-update">
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" ref="name" id="name"
              placeholder="Account name" value={this.state.name} onChange={this.nameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="balance">Balance <span className="label label-default">€</span></label>
            <input type="text" className="form-control" ref="balance"
              id="balance" placeholder="Account balance"
              value={this.state.balance} onChange={this.balanceChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-success">Save</button>
        </form>
      </div>
    )
  }
}

AccountUpdate.propTypes = {
  account: PropTypes.object.isRequired,
};
