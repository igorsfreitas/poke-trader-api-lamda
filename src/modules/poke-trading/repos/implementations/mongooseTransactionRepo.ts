import { Model } from "mongoose"
import { Transaction } from "../../domain/transaction"
import { ITransactionModel } from "../../infra/mongodb/transaction"
import { TransactionMapper } from "../../mappers/transactionMapper"
import { ITransactionRepo } from "../transactionRepo"

export class TransactionRepo implements ITransactionRepo {

  constructor(
    private readonly transactionModel: Model<ITransactionModel>
  ) { }

  public async getTransactions(): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find({ acceptDate: { $exists: false } } )

    return transactions.map(TransactionMapper.toDomain)
  }

  public async getTransactionById(id): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id)

    return TransactionMapper.toDomain(transaction)
  }

  public async save(transaction): Promise<Transaction> {
    const createdTransaction = await this.transactionModel.create(TransactionMapper.toPersistence(transaction))
    return TransactionMapper.toDomain(createdTransaction)
  }

  public async acceptTransaction(transaction: any, transactionId: string): Promise<Transaction> {
    const updatedTransaction = await this.transactionModel.findByIdAndUpdate(transactionId, {
      pokemonsAccepted: transaction.pokemons,
      userAccepted: transaction.user,
      acceptDate: new Date()
    })
    return TransactionMapper.toDomain(updatedTransaction)
  }
}
