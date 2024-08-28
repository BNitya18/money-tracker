document.getElementById('transaction-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
  
    const response = await fetch('http://localhost:3000/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, amount, type }),
    });
  
    const transaction = await response.json();
    document.getElementById('transaction-form').reset();
  });
  
  document.getElementById('show-transactions').addEventListener('click', async () => {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('transactions-section').style.display = 'block';
    await fetchTransactions();
  });
  
  document.getElementById('show-balance').addEventListener('click', async () => {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('balance-section').style.display = 'block';
    await fetchBalance();
  });
  
  document.getElementById('back-transactions').addEventListener('click', () => {
    document.querySelector('.container').style.display = 'flex';
    document.getElementById('transactions-section').style.display = 'none';
  });
  
  document.getElementById('back-balance').addEventListener('click', () => {
    document.querySelector('.container').style.display = 'flex';
    document.getElementById('balance-section').style.display = 'none';
  });
  
  async function fetchTransactions() {
    const response = await fetch('http://localhost:3000/api/transactions');
    const transactions = await response.json();
    const list = document.getElementById('transaction-list');
    list.innerHTML = '';
    transactions.forEach(addTransactionToList);
  }
  
  function addTransactionToList(transaction) {
    const list = document.getElementById('transaction-list');
    const item = document.createElement('li');
    item.innerHTML = `
      ${transaction.description} - ${transaction.amount} (${transaction.type})
      <button onclick="deleteTransaction('${transaction._id}')">Delete</button>
    `;
    list.appendChild(item);
  }
  
  async function deleteTransaction(id) {
    await fetch(`http://localhost:3000/api/transactions/${id}`, {
      method: 'DELETE',
    });
    await fetchTransactions();
  }
  
  async function fetchBalance() {
    const response = await fetch('http://localhost:3000/api/transactions');
    const transactions = await response.json();
    let balance = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    });
    document.getElementById('balance-amount').innerText = `Current Balance: ${balance}`;
  }
  