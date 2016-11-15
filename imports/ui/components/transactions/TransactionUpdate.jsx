import React, {PropTypes} from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert';
import TrackerReact       from 'meteor/ultimatejs:tracker-react'

export default class TransactionUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      success: null,
      name: this.props.transaction.name,
      value: this.props.transaction.value
    }
  }

  nameChange(e) {
    this.setState({name: e.target.value.trim()});
  }

  valueChange(e) {
    this.setState({value: e.target.value.trim().replace(",", ".")});
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const value = ReactDOM.findDOMNode(this.refs.value).value.trim();

    // Check values
    if (!name || !value) {
      this.setState({error: "All fields are required !"});
      return;
    }
    if (isNaN(value) || value < 0) {
      this.setState({error: "Value must be a positive number !"});
      return;
    }
    const doc = {
      $set: {
        name: name,
        value: value
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
    });
  }

  render() {
    return (
      <div className="transaction-update">
        <form onSubmit={this.handleSubmit.bind(this)}>
          {this.state.error ? <Alert message={this.state.error} type="danger" /> : ''}
          {this.state.success ? <Alert message={this.state.success} type="success" /> : ''}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" ref="name" id="name"
              placeholder="Transaction name" value={this.state.name} onChange={this.nameChange.bind(this)} />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value <span className="label label-default">€</span></label>
            <input type="text" className="form-control" ref="value"
              id="value" placeholder="Transaction value"
              value={this.state.value} onChange={this.valueChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-success">Save</button>
        </form>
      </div>
    )
  }
}

TransactionUpdate.propTypes = {
  transaction: PropTypes.object.isRequired,
};
