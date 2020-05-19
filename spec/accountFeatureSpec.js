describe("Account Feature", () => {
  it("deposit 1000, 2000 then withdraw 500", () => {
    jasmine.clock().install();

    const dateOne = new Date(2012, 0, 10, 12);
    const dateTwo = new Date(2012, 0, 13, 12);
    const dateThree = new Date(2012, 0, 14, 12);

    const account = new Account();

    jasmine.clock().mockDate(dateOne);
    account.deposit(1000);

    jasmine.clock().mockDate(dateTwo);
    account.deposit(2000);

    jasmine.clock().mockDate(dateThree);
    account.withdraw(500);

    let statement = [
      "date || credit || debit || balance ",
      "14/01/2012 || || 500.00 || 2500.00 ",
      "13/01/2012 || 2000.00 || || 3000.00 ",
      "10/01/2012 || 1000.00 || || 1000.00 ",
    ].join("\n");

    spyOn(console, "log");

    account.statement();

    expect(console.log).toHaveBeenCalledWith(statement);

    jasmine.clock().uninstall();
  });
});
