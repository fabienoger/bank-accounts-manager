import React                from 'react';
import {mount}              from 'react-mounter';
import MainLayout           from '/imports/ui/layouts/MainLayout'
import Home                 from '/imports/ui/pages/Home'
import Login                from '/imports/ui/pages/Login'
import Register             from '/imports/ui/pages/Register'
import ProfilePage          from '/imports/ui/pages/ProfilePage'
import UserPage             from '/imports/ui/pages/UserPage'
import AccountsPage         from '/imports/ui/pages/AccountsPage'
import AccountPage          from '/imports/ui/pages/AccountPage'
import TransactionsPage     from '/imports/ui/pages/TransactionsPage'
import Sidenav              from '/imports/ui/components/Sidenav'
import AdminPage            from '/imports/ui/pages/admin/AdminPage'
import AdminUsersPage       from '/imports/ui/pages/admin/AdminUsersPage'
import AdminAccountsPage    from '/imports/ui/pages/admin/AdminAccountsPage'
import AdminAccountPage     from '/imports/ui/pages/admin/AdminAccountPage'

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

var adminRoutes = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter: [redirectIfIsAdmin]
});

// handling /admin route
adminRoutes.route('/', {
  action: function() {
    mount(MainLayout, {
      pageName: "AdminPage",
      pageComponent: <AdminPage />
    });
  },
  triggersEnter: [redirectIfIsAdmin]
});

// Admin users list
adminRoutes.route('/users', {
  action: function() {
    mount(MainLayout, {
      pageName: "AdminUsersPage",
      pageComponent: <AdminUsersPage />
    });
  },
  triggersEnter: [redirectIfIsAdmin]
});

// Admin user page
adminRoutes.route('/users/:userId', {
  action: function(params) {
    mount(MainLayout, {
      pageName: "UserPage",
      pageComponent: <UserPage userId={params.userId} admin={true} />
    });
  },
  triggersEnter: [redirectIfIsAdmin]
});

// Admin accounts list
adminRoutes.route('/accounts', {
  action: function() {
    mount(MainLayout, {
      pageName: "AdminAccountsPage",
      pageComponent: <AdminAccountsPage />
    });
  },
  triggersEnter: [redirectIfIsAdmin]
});

adminRoutes.route('/accounts/:accountId', {
  action: function (params, queryParams) {
    mount(MainLayout, {
      pageName: "account",
      pageComponent: <AdminAccountPage accountId={params.accountId} />
    });
  },
  name: "account"
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
FlowRouter.route('/profile', {
  action: function (params, queryParams) {
    mount(MainLayout, {
      pageName: "profile",
      pageComponent: <ProfilePage />
    });
  },
  name: "profile"
});

// User page
FlowRouter.route('/users/:userId', {
  action: function(params) {
    mount(MainLayout, {
      pageName: "UserPage",
      pageComponent: <UserPage userId={params.userId} admin={false} />
    });
  },
  name: 'userPage'
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

function redirectIfIsAdmin() {
  Tracker.autorun(() => {
    const user = Meteor.user();
    if (user) {
      if (user.profile.admin) {
        return true;
      } else {
        FlowRouter.go('/');
        return false;
      }
    }
  });
}

FlowRouter.triggers.enter([redirectIfIsNotLogin], {except: ["login", "register"]});
FlowRouter.triggers.enter([redirectIfIsLogin], {only: ["login", "register"]});
