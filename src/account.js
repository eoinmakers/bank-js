class Account {
  constructor(transactionClass = Transaction) {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
    this.transactionClass = transactionClass;
    this.transactionHistory = [];
  }

  deposit(amount) {
    let credit = toPence(amount);
    this.balance += credit;
    this.addTransaction({ credit: credit, balance: this.balance });
    return `${asPounds(credit)} deposited. Current balance: ${asPounds(
      this.balance
    )}`;
  }

  withdraw(amount) {
    let debit = toPence(amount);
    if (debit > this.balance) return "Insufficient funds";

    this.balance -= debit;
    this.addTransaction({ debit: debit, balance: this.balance });
    return `${asPounds(debit)} withdrawn. Current balance: ${asPounds(
      this.balance
    )}`;
  }

  addTransaction(obj) {
    const transaction = new this.transactionClass(obj);
    this.transactionHistory.unshift(transaction);
  }
}
