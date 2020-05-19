describe("Account", () => {
  describe(".deposit", () => {
    it("results in balance of 100 when passed 100", () => {
      const account = new Account();
      expect(account.deposit(100)).toEqual(
        "100.00 deposited. Current balance: 100.00"
      );
    });
    
    it('results in balance of 200 when passed 200', () => {
      const account = new Account();
      expect(account.deposit(200)).toEqual(
        "200.00 deposited. Current balance: 200.00"
      );
    });
  });
});
