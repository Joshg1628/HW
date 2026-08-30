'use strict';
// bank

const bank = {
    accounts: [],

    createAccount: function (name, number) {
        const account = {
            accountName: name,
            accountNumber: number,
            balance: 0,


            doTransaction: function (amount) {
                this.balance += amount;
            },
        };
        this.accounts.push(account); // add to account list
        return account;
    },
};

function transaction(amount) {
    this.balance += amount;
}

const checkingAccount = bank.createAccount('Shia G', '111');
const savingsAccount = bank.createAccount('Joshg', '11111');

checkingAccount.doTransaction(1000);
checkingAccount.doTransaction(-200);
// 
savingsAccount.doTransaction(500);


transaction.call(checkingAccount, 250);
transaction.apply(savingsAccount, [-100]); // array of args in params



const depositFiveTosavings = transaction.bind(savingsAccount, 50); // predeine a tied method 
depositFiveTosavings();
depositFiveTosavings();


console.log(checkingAccount);
console.log(savingsAccount);
