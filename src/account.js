class Account {
  
  constructor() {
    const STARTING_BALANCE = 0

    this.balance = STARTING_BALANCE;
  }

  deposit(amount) {
    let credit = amount * 100
    this.balance += credit
    let displayCredit = parseFloat(credit / 100).toFixed(2);
    let displayBalance = parseFloat(this.balance / 100).toFixed(2);
    return `${displayCredit} deposited. Current balance: ${displayBalance}`;
  }
}
