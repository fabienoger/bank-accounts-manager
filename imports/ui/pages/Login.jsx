import React      from 'react';
import LoginForm  from '/imports/ui/components/LoginForm'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row login">
        <div className="col-md-6 col-md-offset-3">
          <LoginForm />
        </div>
      </div>
    )
  }
}
