import React              from 'react';
import ReactDOM           from 'react-dom';
import { Meteor }         from 'meteor/meteor';
import Alert              from '/imports/ui/components/Alert'

export default class AccountsAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null
    }
  }

  render() {
    return (
      <div className="accounts-add">
        <div className="page-header">
          <h2>Add acccount</h2>
        </div>
        <form>

        </form>
      </div>
    )
  }
}
