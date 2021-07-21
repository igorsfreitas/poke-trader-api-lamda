import { BaseController } from "src/infra/BaseController"
import { GetProposalsUseCase } from "./implementation"

export class GetProposalsController extends BaseController {

    constructor(private readonly useCase: GetProposalsUseCase) {
        super()
    }

    public async executeImpl(req: any): Promise<any> {
        try {

            const execution = await this.useCase.execute()

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
