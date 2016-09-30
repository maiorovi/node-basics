var account = {
  balance: 0
};

function UserException(message) {
  this.message = message
  this.name = "Исключение, определенное пользователем"
}

//deposit(account, amount)
function deposit(account, amount) {
  account.balance += amount
}

//withdraw
function withdraw(account, amount) {
  var currentAmount = account.balance
  if (currentAmount < amount) {
    throw new UserException("Amount > AvailableAmount")
  }

  account.balance -= amount

  return
}

function getBalance(account) {
  return account.balance
}

deposit(account, 1000)

console.log(getBalance(account))

withdraw(account, 50);

console.log(getBalance(account))

withdraw(account, 1000)
