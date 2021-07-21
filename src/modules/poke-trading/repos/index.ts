import { UserRepo } from './implementations/mongooseUserRepo'
import { transactionModel, userModel } from '../infra/mongodb'
import { TransactionRepo } from './implementations/mongooseTransactionRepo'

const userRepo = new UserRepo(userModel)
const transactionRepo = new TransactionRepo(transactionModel)

export {
    userRepo,
    transactionRepo
}
