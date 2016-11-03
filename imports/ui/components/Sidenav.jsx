import React                from 'react';
import { createContainer }  from 'meteor/react-meteor-data';
import {Row, Col}           from 'react-bootstrap'
import { Meteor }           from 'meteor/meteor';

export default class Sidenav extends React.Component {
  mixins: [ReactMeteorData]
  getMeteorData() {
    return {
      currentUser: Meteor.user() || {}
    };
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
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">{ this.data.currentUser ? this.data.currentUser.username : '' }</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{ this.props.currentUser ? this.props.currentUser.username : '' } <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
