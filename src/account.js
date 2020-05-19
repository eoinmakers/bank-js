class Account {
  constructor(
    transactionClass = Transaction,
    printer = new StatementPrinter()
  ) {
    const STARTING_BALANCE = 0;

    this.balance = STARTING_BALANCE;
    this.transactionClass = transactionClass;
    this.printer = printer;
    this.transactionHistory = [];
  }

  deposit(amount) {
    let credit = toPence(amount);
    this.balance += credit;
    this.addTransaction({ credit: credit, balance: this.balance });
    return this.transactionMessage(credit, "deposited");
  }

  withdraw(amount) {
    let debit = toPence(amount);
    if (debit > this.balance) return "Insufficient funds";

    this.balance -= debit;
    this.addTransaction({ debit: debit, balance: this.balance });
    return this.transactionMessage(debit, "withdrawn");
  }

  transactionMessage(amount, action) {
    let currentBalance = asPounds(this.balance)
    let pounds = asPounds(amount);
    return `${pounds} ${action}. Current balance: ${currentBalance}`;
  }

  statement() {
    this.printer.print(this.transactionHistory);
  }

  addTransaction(obj) {
    const transaction = new this.transactionClass(obj);
    this.transactionHistory.unshift(transaction);
  }
}
