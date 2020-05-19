<!-- omit in toc -->
# Bank - JavaScript

This is a small project to practice maintaining code quality and process. [Source]

This is a reimplementation of my previous Ruby implementation, [available here](https://github.com/hturnbull93/bank/).

It allows you to create an account, deposit funds into it, withdraw funds from it, and print statements.

- [Spec](#spec)
  - [Requirements](#requirements)
  - [Acceptance criteria](#acceptance-criteria)
- [Quick Start](#quick-start)
- [Dependencies](#dependencies)
- [Development Journal](#development-journal)
  - [Domain Modelling](#domain-modelling)
  - [User Stories](#user-stories)
  - [Set up](#set-up)
  - [Deposits](#deposits)
  - [Withdrawals](#withdrawals)
  - [Statement](#statement)
  - [Transactions](#transactions)
  - [Back to the Statement](#back-to-the-statement)
  - [Extracting a Statement Printer](#extracting-a-statement-printer)

## Spec

### Requirements

- You should be able to interact with your code via a REPL like IRB or the JavaScript console. (You don't need to implement a command line interface that takes input from STDIN.)
- Deposits, withdrawal.
- Account statement (date, amount, balance) printing.
- Data can be kept in memory (it doesn't need to be stored to a database or anything).

### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2012  
**And** a deposit of 2000 on 13-01-2012  
**And** a withdrawal of 500 on 14-01-2012  
**When** she prints her bank statement  
**Then** she would see:

```irb
date || credit || debit || balance
14/01/2012 || || 500.00 || 2500.00
13/01/2012 || 2000.00 || || 3000.00
10/01/2012 || 1000.00 || || 1000.00
```

## Quick Start

_Coming soon_

## Dependencies

[Jasmine] is used as a test framework.

[Moment.js] is used to help convert date objects into formatted strings. It is quite a small library when minified, and I have included a local copy in `src/moment.min.js`.

## Development Journal

### Domain Modelling

Given that I know more about the final form of the program from the previous implementation, this project focusses more on the implementation rather than the planning steps. The below CRC modelling and User Stories are taken from the Ruby implementation.

CRC modelling:

![CRC Model](images/Bank-REPL-CRC.png)

### User Stories

- [x] 1

> As a Bank Manager,  
> So that we only take customers money,  
> I want accounts to start with balance 0

- [x] 2

> As a Customer,  
> So I can keep my money safe,  
> I want to be able to deposit into my account

- [x] 3

> As a Customer,  
> So I can spend my money,  
> I want to be able to withdraw from my account

- [x] 3.1

> As a Bank Manager,  
> So we don't go out of pocket,  
> I want withdrawals to only be allowed to occur if the customer has sufficient funds

- [ ] 4

> As a Customer,  
> So I can keep on top of my finances,  
> I want to be able to print my account statement

- [x] 4.1

> As a Customer,  
> So I know when each transaction happened,  
> I want transactions on my statement to have the date

- [x] 4.2

> As a Customer,  
> So I know how much each deposit was,  
> I want deposits on my statement to have the credit amount.

- [x] 4.3

> As a Customer,  
> So I know how much each withdrawal was,  
> I want withdrawals on my statement to have the debit amount.

- [x] 4.4

> As a Customer,  
> So can keep track of my balance,  
> I want transactions on my statement to have the balance amount after the transaction was completed.

- [ ] 4.5

> As a Customer,  
> Because more recent transactions are more important to me,  
> I want the statement transactions to be ordered from newest to oldest.

### Set up

Installed Jasmine, a JS browser testing framework.

Stripped out Jasmine example files.

### Deposits

- [x] 1

> As a Bank Manager,  
> So that we only take customers money,  
> I want accounts to start with balance 0

- [x] 2

> As a Customer,  
> So I can keep my money safe,  
> I want to be able to deposit into my account

In `spec/accountSpec.js` wrote a test for an `Account` class, with a `deposit` method taking 100 results in a string showing deposited 100 and  balance of 100. Red.

In `src/account.js`:

- Added `Account` class.
- Added `deposit` function that returns the required string hardcoded.

Green.

Wrote test for `deposit` method taking 200 results in a string showing deposited 200.00 and balance of 200.00. Red.

- `deposit` now checks for the amount, then if it is 200, return the relevant "200.00" string, else return the "100.00" string.

Green.

Wrote test for `deposit` method taking 200 then 100 results in a string showing deposited 100.00 and balance of 300.00. Red.

- Added `constructor` to `Account` initialising `balance` with constant `STARTING_BALANCE` set as 0.
- `deposit` adds amount to balance, then interpolates the amount and new balance into a returned string.

Green.

Wrote test for `deposit` method taking 10.50, should in a string showing deposited 10.50 and balance of 10.50. Red.

The balance should probably be stored as pence, rather than as a float, but it needs to be display at two decimal places as if it were pounds and pence.

- Let `credit` in `deposit` be the amount passed multiplied by 100 (to get pence value).
- Added `credit` to the balance.
- let `displayCredit` assigned with parseFloat of credit / 100, toFixed 2 decimal places.
- Similarly let `displayBalance` convert to 2 decimal places.
- Then interpolate `displayCredit` and `displayBalance` into the returned string.

Green.

Refactors:

- Extracted the operations used in `displayCredit` and `displayBalance` to a separate method, `asPounds`.
- Extracted the operation used to convert the amount to pence into a new method, `toPence`.
- Moved the extracted methods to their own file, `src/conversion.js`.

### Withdrawals

- [x] 3

> As a Customer,  
> So I can spend my money,  
> I want to be able to withdraw from my account

Wrote test for withdrawing 100 from an account with 1000, returned string has balance: 900.00.

- Added `withdraw` method, hardcoded returned string.

Green.

Wrote test for withdrawing 200 from an account with 1000, returned string has balance: 800.00.

- In `withdraw` implement similar functionality to deposit, however in this case deduct the debited amount from the balance.

Wrote test for withdrawing 100 then 200 from an account with 1000, returned string has balance: 700.00. It is already green as the borrowed code from `deposit` already implements this.

- [x] 3.1

> As a Bank Manager,  
> So we don't go out of pocket,  
> I want withdrawals to only be allowed to occur if the customer has sufficient funds

Wrote test for withdrawing 1500 from an account with 1000, string returned should say "Insufficient funds".

- Added guard clause to check if the amount to be withdrawn is greater than the current balance, if so return the string.

Green.

### Statement

- [ ] 4

> As a Customer,  
> So I can keep on top of my finances,  
> I want to be able to print my account statement

In `spec/accountFeatureSpec.js` wrote a feature test similar to the above acceptance criteria, using jasmine clock to mock the date. Red.

The best way to solve this feature is to implement a Transaction class.

### Transactions

- [x] 4.1

> As a Customer,  
> So I know when each transaction happened,  
> I want transactions on my statement to have the date

In `spec/transactionSpec.js` wrote a test for the `display` method of the `Transaction` class to return a formatted string, with the formatted date in the first column. Red.

In `src/transaction.js`:

- `Transaction` class, with `constructor` setting `this.date` with a new instance of `Date`.
- `dateFormat` uses the moment library to format the date as "dd/mm/yyyy" (manually formatting dates in JavaScript is a bit more fiddly compared to Ruby, moment is installed locally in `src/moment.min.js`).
- `display` method returns a string interpolated with the `dateFormat` returned value.

Green.

- [x] 4.2

> As a Customer,  
> So I know how much each deposit was,  
> I want deposits on my statement to have the credit amount.

Wrote a test for constructing a transaction object with a credit value, its `display` method should include that value in the second column of the returned string. Red.

- `Transaction` constructor takes an argument of credit defaulting to null, which is assigned to `this.credit`.
- Added `render` method which takes an item, then if that is not nul returns `asPounds` passing in the item, concatenated with a trailing space.
- `display` interpolates `render` of `this.credit`.

Green.

- [x] 4.3

> As a Customer,  
> So I know how much each withdrawal was,  
> I want withdrawals on my statement to have the debit amount.

Wrote a test for constructing a transaction object with a credit value of null and second argument for debit, its `display` method should include the debit value in the third column of the returned string. Red.

- `constructor`'s second argument is debit, defaulting to null, assigned to `this.debit`.
- `display` interpolates in the third column `render` of `this.debit`.

Green.

- [x] 4.4

> As a Customer,  
> So can keep track of my balance,  
> I want transactions on my statement to have the balance amount after the transaction was completed.

Wrote a test for constructing a transaction object with a credit value of null, a debit value of null, and a third argument for balance, its `display` method should include the balance value in the fourth column of the returned string. Red.

- `constructor`'s third argument is valance, defaulting to null, assigned to `this.balance`.
- `display` interpolates in the fourth column `render` of `this.balance`.

Green.

Refactors:

- The display method has a lot of duplication or columns in a long string interpolation, which also doesn't read very well any way you try to format it. Changed this to an array with each of the elements as a `render` call, joined with a delimiter of "|| " for the columns.
- Tweaked the `dateFormat` method to add a single trailing space also.
- Having to pass in "null, 10000, 10000" to the `constructor` could lead to errors. Changed for an object as argument, using destructuring to fill in any missing keys with null.

### Back to the Statement

Wrote a test that `deposit` calls for a new `Transaction`. Red,

- The `Account` class can have `Transaction` injected into it.
- The `constructor` takes an argument `transactionClass` defaulting to `Transaction`, assigned to `this.transactionClass`.
- `this.transactionHistory` is assigned as an empty array.
- the `addTransaction` method takes an object as argument, and created a transaction as a new `this.transactionClass` passing in the obj, then unshifts it onto the transaction history.
- `deposit` calls `addTransaction` passing in an object with the credit and balance.

Green.

Wrote a test that `withdraw` calls for a new `Transaction`. Red,

- `withdraw` calls `addTransaction` passing in ab object with the debit and balance.

Green.

To pass the feature test:

- The `Account` `statement` method includes a constant `STATEMENT_HEADER` assigned with the header string for the statement, ending in newline.
- It then assigns `statementRows` by mapping through the `transactionHistory`, calling `display` on each transaction.
- It then returns the `STATEMENT_HEADER` concatenated with `statementRows` joined with newline characters.

Green.

### Extracting a Statement Printer

Wrote a test that `statement` calls `StatementPrinter.print`. Red.

- Extracted the constant and logic from the `statement` method into a new class, `StatementPrinter`.
- Its `constructor` sets `this.STATEMENT_HEADER` as the header string with newline.
- Its `print` method takes any array of transactions, maps through them calling their `display` methods assigned to `rows`, then returns `this.STATEMENT_HEADER` concatenated with `rows` joined with newline characters.

Refactors:

Rather than returning a concatenated string, the printer should log it to the console.

- Adjusted the feature test to spy on `console`'s `log` method, expecting it to be called with the prepared `statement`.
- `StatementPrinter`'s `print` method console logs instead of returning.
- `Account`'s `statement` method no longer needs to return the call, it just calls `StatementPrinter`'s `print`.

Also:

- Extracted a method `transactionMessage` from withdraw and amount to handle the `asPounds` conversion of the credit/debit and balance for input into the transaction message string.
<!-- Links -->

[source]: https://github.com/makersacademy/course/blob/master/individual_challenges/bank_tech_test.md
[Jasmine]: https://jasmine.github.io/index.html
[Moment.js]: https://momentjs.com/
