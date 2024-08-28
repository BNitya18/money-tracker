const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/moneytracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  

  const transactionSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    type: String,
    date: { type: Date, default: Date.now },
  });
  

  const Transaction = mongoose.model('Transaction', transactionSchema);

  app.post('/api/transactions', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.send(transaction);
  });
  

  app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.send(transactions);
  });

  app.delete('/api/transactions/:id', async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.send({ message: 'Transaction deleted' });
  });
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });