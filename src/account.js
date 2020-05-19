class Account {
  
  constructor() {
    const STARTING_BALANCE = 0

    this.balance = STARTING_BALANCE;
  }

  deposit(amount) {
    this.balance += amount
    return `${amount}.00 deposited. Current balance: ${this.balance}.00`
  }
}
