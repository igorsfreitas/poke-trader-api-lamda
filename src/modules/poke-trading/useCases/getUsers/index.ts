import { GetUsersUseCase } from './implementation'
import { GetUsersController } from './controller'
import { userRepo } from '../../repos'

const getUsersUseCase = new GetUsersUseCase(userRepo)
const getUsersController = new GetUsersController(getUsersUseCase)

export {
    getUsersController
}
