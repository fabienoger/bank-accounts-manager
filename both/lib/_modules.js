Modules = {
  client: {},
  server: {},
  both: {
    transactionsCategories: ["Other", "Withdrawal", "Hobbies"],
    utils: {
      // Check email format
      checkEmail: email => {
        if (!email) {
          return false;
        }
        // Set RegExp for email
        const regEmail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/);
        if (regEmail.test(email)) {
          return true;
        }
        return false;
      },
      // Check if sender Account can not be debited
      checkIfTransferCanBeMade: transfer => {
        if (!transfer) {
          throw new Meteor.Error("missing-param", "The param 'transfer' is missing !");
        }
        // Check if the accounts are different
        if (transfer.fromAccountId == transfer.toAccountId) {
          throw new Meteor.Error("acounts-must-be-different", "Recipient account and sender account must be different !");
        }
        return true;
      }
    }
  }
}
