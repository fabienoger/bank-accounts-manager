import React, {PropTypes}   from 'react';

export default class AccountSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }

  componentWillMount() {
    if (this.props.defaultValue) {
      this.setState({value: this.props.defaultValue})
    }
  }

  render() {
    const accounts = this.props.accounts;
    return (
      <div className="form-group">
        <label htmlFor={this.props.label} >{this.props.label}</label>
        <select ref="AccountSelect" id={this.props.label} className="form-control"
          onChange={this.props.selectChange.bind(this)} defaultValue={this.state.value}>
          {accounts.map((account) => {
            return (<option key={account._id} value={account._id}>{account.name} - {account.balance} €</option>)
          })}
        </select>
      </div>
    )
  }
}

AccountSelect.PropTypes = {
  accounts: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string
};
