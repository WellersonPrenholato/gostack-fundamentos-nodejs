import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance({ income, outcome, total }: Balance): Balance {
    const balance = this.transactions.reduce((accumulator, transaction) => {
      switch (transaction.type){
        case "income":
          accumulator.income += transaction.value;
          break;
      }
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });
  }

  public create({ title, value, type}: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
