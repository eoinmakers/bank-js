describe("Transaction", () => {
  describe(".display", () => {
    it("has the date the transaction was made in the first column, formatted as dd/mm/yyyy", () => {
      let date = new Date(2020, 4, 19);
      jasmine.clock().install();
      jasmine.clock().mockDate(date);

      const transaction = new Transaction();

      expect(transaction.display()).toEqual("19/05/2020 || || || ");

      jasmine.clock().uninstall();
    });

    it("has the credit amount in second column", () => {
      let date = new Date(2020, 4, 19);
      jasmine.clock().install();
      jasmine.clock().mockDate(date);

      const transaction = new Transaction({ credit: 10000 });

      expect(transaction.display()).toEqual("19/05/2020 || 100.00 || || ");

      jasmine.clock().uninstall();
    });

    it("has the debit amount in third column", () => {
      let date = new Date(2020, 4, 19);
      jasmine.clock().install();
      jasmine.clock().mockDate(date);

      const transaction = new Transaction({ debit: 10000 });

      expect(transaction.display()).toEqual("19/05/2020 || || 100.00 || ");

      jasmine.clock().uninstall();
    });

    it("has the balance amount in fourth column", () => {
      let date = new Date(2020, 4, 19);
      jasmine.clock().install();
      jasmine.clock().mockDate(date);

      const transaction = new Transaction({ balance: 10000 });

      expect(transaction.display()).toEqual("19/05/2020 || || || 100.00 ");

      jasmine.clock().uninstall();
    });
  });
});
