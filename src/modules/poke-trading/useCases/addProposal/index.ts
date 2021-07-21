import { AddProposalUseCase } from './implementation'
import { AddProposalController } from './controller'
import { transactionRepo } from '../../repos'

const addProposalUseCase = new AddProposalUseCase(transactionRepo)
const addProposalController = new AddProposalController(addProposalUseCase)

export {
    addProposalController
}
