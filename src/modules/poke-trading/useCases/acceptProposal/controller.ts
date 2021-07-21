import { BaseController } from "src/infra/BaseController"
import { AcceptProposalDto } from "../../dto"
import { AcceptProposalUseCase } from "./implementation"

export class AcceptProposalController extends BaseController {

    constructor(private readonly useCase: AcceptProposalUseCase) {
        super()
    }

    public async executeImpl(req: any): Promise<any> {
        try {

            const {
                id,
            } = req.pathParameters
            
            const dto: AcceptProposalDto = {
                accept: req.body.accept,
                offer: req.body.offer,
                id
            } as AcceptProposalDto

            const execution = await this.useCase.execute(dto)

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
