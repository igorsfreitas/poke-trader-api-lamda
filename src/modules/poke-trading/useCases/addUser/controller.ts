import { BaseController } from "src/infra/BaseController"
import { AddUserUseCase } from "./implementation"

export class AddUserController extends BaseController {

    constructor(private readonly useCase: AddUserUseCase) {
        super()
    }

    public async executeImpl(req: any): Promise<any> {
        try {
            const name = req.body.name

            const execution = await this.useCase.execute({ name })

            if (execution.isLeft()) {
                const error = execution.value

                return this.fail(error.errorValue().message)
            } else {
                return this.ok(execution.value.getValue())
            }

        } catch (error) {
            console.error(error)
            return this.fail(error.message)
        }
    }
}
