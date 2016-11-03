import React          from 'react';
import RegisterForm   from '/imports/ui/components/RegisterForm'

export default class Register extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row login">
        <div className="col-md-6 col-md-offset-3">
          <RegisterForm />
        </div>
      </div>
    )
  }
}
