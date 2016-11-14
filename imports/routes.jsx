import React                from 'react';
import {mount}              from 'react-mounter';
import MainLayout           from '/imports/ui/layouts/MainLayout'
import Home                 from '/imports/ui/pages/Home'
import Login                from '/imports/ui/pages/Login'
import Register             from '/imports/ui/pages/Register'
import UserPage             from '/imports/ui/pages/UserPage'
import AccountsPage         from '/imports/ui/pages/AccountsPage'
import AccountPage          from '/imports/ui/pages/AccountPage'
import TransactionsPage     from '/imports/ui/pages/TransactionsPage'
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

// TRANSACTIONS
FlowRouter.route('/transactions', {
  action: function (params, queryParams) {
    mount(MainLayout, {
      pageName: "transactions",
      pageComponent: <TransactionsPage />
    });
  },
  name: "transactions"
});

// ACCOUNTS
FlowRouter.route('/accounts', {
  action: function (params, queryParams) {
    mount(MainLayout, {
      pageName: "accounts",
      pageComponent: <AccountsPage />
    });
  },
  name: "accounts"
});

FlowRouter.route('/accounts/:accountId', {
  action: function (params, queryParams) {
    mount(MainLayout, {
      pageName: "account",
      pageComponent: <AccountPage accountId={params.accountId} />
    });
  },
  name: "account"
});

// USER
FlowRouter.route('/user', {
  action: function (params, queryParams) {
    mount(MainLayout, {
      pageName: "user",
      pageComponent: <UserPage />
    });
  },
  name: "user"
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
