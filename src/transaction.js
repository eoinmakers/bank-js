class Transaction {
  constructor(credit = null) {
    this.date = new Date();
    this.credit = credit;
  }

  display() {
    return `${this.dateFormat()} || ${this.render(this.credit)}|| || `;
  }

  dateFormat() {
    return moment(this.date).format("DD/MM/YYYY");
  }

  render(item) {
    if (item != null) return asPounds(item) + " ";
    return "";
  }
}
