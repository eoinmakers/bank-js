class Account {
  constructor() {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
  }

  deposit(amount) {
    let credit = toPence(amount);
    this.balance += credit;
    return `${asPounds(credit)} deposited. Current balance: ${asPounds(
      this.balance
    )}`;
  }

  withdraw(amount) {
    let debit = toPence(amount);
    this.balance -= debit;
    return `${asPounds(debit)} withdrawn. Current balance: ${asPounds(
      this.balance
    )}`;
  }
}
