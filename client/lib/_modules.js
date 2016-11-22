Modules.client = {
  utils: {
    // Format data for c3 chart
    formatForChart: (data, chartType) => {
      if (!data || !chartType) {
        return [];
      }
      let result = [];
      // Add column at the beginning of result for x axis (dates)
      if (chartType == "timeseries") {
        let x = ['x'];
        _.each(data, d => {
          x.push(d.lastUpdate.toISOString().replace(/T/, ' ').replace(/\..+/, ''));
        })
        result.push(x);
      }
      // Add x Array for timeseries
      const categories = Modules.both.transactionsCategories;
      _.each(categories, (c) => {
        let tmpTransactions = Modules.client.utils.transactionsByCategory(data, c);
        tmpTransactions.unshift(c);
        result.push(tmpTransactions);
      });
      return result;
    },
    // Return Array of transactions for one category
    transactionsByCategory: (transactions, category) => {
      if (!transactions || !category) {
        return [];
      }
      let result = _.filter(transactions, (t) => {
        return t.category == category
      });
      result = _.map(result, (r) => {
        return r.value;
      });
      return result;
    }
  }
}
