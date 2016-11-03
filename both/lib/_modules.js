Modules = {
  client: {},
  server: {},
  both: {
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
      }
    }
  }
}
