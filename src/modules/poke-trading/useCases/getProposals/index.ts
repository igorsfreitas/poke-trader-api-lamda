import { GetProposalsUseCase } from './implementation'
import { GetProposalsController } from './controller'
import { transactionRepo } from '../../repos'

const getProposalsUseCase = new GetProposalsUseCase(transactionRepo)
const getProposalsController = new GetProposalsController(getProposalsUseCase)

export {
    getProposalsController
}
