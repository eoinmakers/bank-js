class StatementPrinter {
  constructor() {
    this.STATEMENT_HEADER = "date || credit || debit || balance \n";
  }
  print(transactionArray) {
    let rows = transactionArray.map(transaction => transaction.display());
    console.log(this.STATEMENT_HEADER + rows.join("\n"));
  }
}
