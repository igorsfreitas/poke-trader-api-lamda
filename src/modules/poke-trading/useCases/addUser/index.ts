import { AddUserUseCase } from './implementation'
import { AddUserController } from './controller'
import { userRepo } from '../../repos'

const addUserUseCase = new AddUserUseCase(userRepo)
const addUserController = new AddUserController(addUserUseCase)

export {
    addUserController
}
