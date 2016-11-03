import React        from 'react';
import {Row, Col}     from 'react-bootstrap'
import { Meteor }   from 'meteor/meteor';

export default class Sidenav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">BAM</a>
          </div>

          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li key='home' className={this.props.page == 'home' ? 'active' : ''} >
                <a href="/">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
