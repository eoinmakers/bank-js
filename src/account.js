class Account {
  
  constructor() {
    const STARTING_BALANCE = 0

    this.balance = STARTING_BALANCE;
  }

  deposit(amount) {
    let credit = toPence(amount)
    this.balance += credit
    return `${asPounds(credit)} deposited. Current balance: ${asPounds(this.balance)}`;
  }
}
