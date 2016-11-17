import React                                                from 'react';
import {Form, FormGroup, ControlLabel, FormControl, InputGroup, Button} from 'react-bootstrap';
import TrackerReact                                         from 'meteor/ultimatejs:tracker-react';
import Loading                                              from '/imports/ui/components/Loading';

export default class FindUsers extends TrackerReact(React.Component) {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange(e) {
    const str = e.target.value.trim();
    this.setState({value: str});
    this.props.findUsers(str);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.findUsers(this.state.value);
  }

  removeValue(e) {
    e.preventDefault();
    this.setState({value: ''});
    this.props.findUsers('');
  }

  render() {
    const formStyle = {
      display: "inline-block",
      marginLeft: '15px'
    }
    return (
      <Form inline className="find-users"
        onSubmit={this.handleSubmit.bind(this)}
        style={formStyle}>
        <FormGroup controlId="value">
          <InputGroup>
            <InputGroup.Addon>Find users</InputGroup.Addon>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Username, userId, email"
              onChange={this.handleChange.bind(this)}
            />
            <InputGroup.Button>
              {this.state.value ?
                <Button bsStyle="danger" onClick={this.removeValue.bind(this)}>
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </Button>
              :
                <Button bsStyle="primary" type="submit">
                  <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                </Button>
              }
            </InputGroup.Button>
            </InputGroup>
        </FormGroup>
      </Form>
    )
  }
}
