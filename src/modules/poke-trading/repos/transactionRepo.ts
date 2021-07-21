import { Repo } from "src/infra/Repo";
import { Transaction } from "../domain/transaction"

export interface ITransactionRepo extends Repo<Transaction> {
   getTransactions (): Promise<Transaction[]>
   getTransactionById (id): Promise<Transaction>
   save (transaction: any): Promise<Transaction> 
   acceptTransaction (transaction: any, transactionId: string): Promise<Transaction> 
}
