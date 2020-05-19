describe("Account", () => {
  describe(".deposit", () => {
    it("returns str with balance: 100 when passed 100", () => {
      const account = new Account();

      expect(account.deposit(100)).toEqual(
        "100.00 deposited. Current balance: 100.00"
      );
    });

    it("returns str with balance: 200 when passed 200", () => {
      const account = new Account();

      expect(account.deposit(200)).toEqual(
        "200.00 deposited. Current balance: 200.00"
      );
    });

    it("returns str with deposited 100, balance: 300, when passed 200 then 100", () => {
      const account = new Account();
      account.deposit(200);

      expect(account.deposit(100)).toEqual(
        "100.00 deposited. Current balance: 300.00"
      );
    });

    it("returns str with balance: 10.50 when passed 10.50", () => {
      const account = new Account();

      expect(account.deposit(10.5)).toEqual(
        "10.50 deposited. Current balance: 10.50"
      );
    });
  });

  describe(".withdraw", () => {
    it("reduces balance by 100 when passed 100", () => {
      const account = accountWith1000Deposited();

      expect(account.withdraw(100)).toEqual(
        "100.00 withdrawn. Current balance: 900.00"
      );
    });

    it("reduces balance by 200 when passed 200", () => {
      const account = accountWith1000Deposited();

      expect(account.withdraw(200)).toEqual(
        "200.00 withdrawn. Current balance: 800.00"
      );
    });

    it("100 then 200, return string has balance: 700.00", () => {
      const account = accountWith1000Deposited();
      account.withdraw(100);

      expect(account.withdraw(200)).toEqual(
        "200.00 withdrawn. Current balance: 700.00"
      );
    });

    it("1500 should return string 'Insufficient funds'", () => {
      const account = accountWith1000Deposited();

      expect(account.withdraw(1500)).toEqual("Insufficient funds");
    });
  });

  describe("uses Transaction class", () => {
    it("deposit calls for new Transaction", () => {
      let mockObj = {
        Mock: function () {},
      };
      spyOn(mockObj, "Mock");
      const account = new Account(mockObj.Mock);

      account.deposit(100);
      expect(mockObj.Mock).toHaveBeenCalled();
    });

  });
});

function accountWith1000Deposited() {
  let account = new Account();
  account.deposit(1000);
  return account;
}
