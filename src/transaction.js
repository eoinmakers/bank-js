class Transaction {
  constructor({credit = null, debit = null, balance = null} = {}) {
    this.date = new Date();
    this.credit = credit;
    this.debit = debit;
    this.balance = balance;
  }

  display() {
    return [
      this._dateFormat(),
      this._render(this.credit),
      this._render(this.debit),
      this._render(this.balance)
    ].join("|| ")
  }

  _dateFormat() {
    return moment(this.date).format("DD/MM/YYYY ");
  }

  _render(item) {
    if (item != null) return asPounds(item) + " ";
    return "";
  }
}
