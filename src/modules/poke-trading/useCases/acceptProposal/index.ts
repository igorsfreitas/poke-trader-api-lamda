import { AcceptProposalUseCase } from './implementation'
import { AcceptProposalController } from './controller'
import { transactionRepo } from '../../repos'

const acceptProposalUseCase = new AcceptProposalUseCase(transactionRepo)
const acceptProposalController = new AcceptProposalController(acceptProposalUseCase)

export {
    acceptProposalController
}
