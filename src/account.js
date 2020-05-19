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
    this._addTransaction({ credit: credit, balance: this.balance });
    return this._transactionMessage(credit, "deposited");
  }

  withdraw(amount) {
    let debit = toPence(amount);
    if (debit > this.balance) return "Insufficient funds";

    this.balance -= debit;
    this._addTransaction({ debit: debit, balance: this.balance });
    return this._transactionMessage(debit, "withdrawn");
  }

  _transactionMessage(amount, action) {
    let currentBalance = asPounds(this.balance);
    let pounds = asPounds(amount);
    return `${pounds} ${action}. Current balance: ${currentBalance}`;
  }

  statement() {
    this.printer.print(this.transactionHistory);
  }

  _addTransaction(obj) {
    const transaction = new this.transactionClass(obj);
    this.transactionHistory.unshift(transaction);
  }
}
