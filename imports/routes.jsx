import React                from 'react';
import {mount}              from 'react-mounter';
import MainLayout           from '/imports/ui/layouts/MainLayout'
import Home                 from '/imports/ui/components/Home'
import Sidenav              from '/imports/ui/components/Sidenav'

/* HOME */
FlowRouter.route('/', {
  action: function (params, queryParams) {
    mount(MainLayout, {
        pageName: "home",
        pageComponent: <Home />
    });
  }
});
