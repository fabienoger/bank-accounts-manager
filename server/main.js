import { Meteor } from 'meteor/meteor';

import '/imports/api/users'
import '/imports/api/accounts'
import '/imports/api/transactions'
import '/imports/api/transfers'

Meteor.startup(() => {
  // code to run on server at startup
});
