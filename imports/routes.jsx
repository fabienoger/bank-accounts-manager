import React                from 'react';
import {mount}              from 'react-mounter';
import MainLayout           from '/imports/ui/layouts/MainLayout'
import Home                 from '/imports/ui/pages/Home'
import Login                 from '/imports/ui/pages/Login'
import Register                 from '/imports/ui/pages/Register'
import Sidenav              from '/imports/ui/components/Sidenav'

// HOME
FlowRouter.route('/', {
  action: function (params, queryParams) {
    mount(MainLayout, {
      pageName: "home",
      pageComponent: <Home />
    });
  },
  name: "home"
});

// LOGIN
FlowRouter.route('/login', {
  action: function (params, queryParams) {
    mount(MainLayout, {
      pageName: "login",
      pageComponent: <Login />
    });
  },
  name: "login"
});

// REGISTER
FlowRouter.route('/register', {
  action: function (params, queryParams) {
    mount(MainLayout, {
      pageName: "register",
      pageComponent: <Register />
    });
  },
  name: "register"
});

// Redirect the user if it is not connected
function redirectIfIsNotLogin(context) {
  if (!Meteor.userId()) {
    FlowRouter.go('/login');
  }
}

// Redirect the user if it is connected
function redirectIfIsLogin(context) {
  if (Meteor.userId()) {
    FlowRouter.go('/');
  }
}

FlowRouter.triggers.enter([redirectIfIsNotLogin], {except: ["login", "register"]});
FlowRouter.triggers.enter([redirectIfIsLogin], {only: ["login", "register"]});
