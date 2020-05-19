class Transaction {
  constructor(credit = null, debit = null, balance = null) {
    this.date = new Date();
    this.credit = credit;
    this.debit = debit;
    this.balance = balance;
  }

  display() {
    return `${
      this.dateFormat()
    } || ${
      this.render(this.credit)
    }|| ${
      this.render(this.debit)
    }|| ${
      this.render(this.balance)
    }`;
  }

  dateFormat() {
    return moment(this.date).format("DD/MM/YYYY");
  }

  render(item) {
    if (item != null) return asPounds(item) + " ";
    return "";
  }
}
