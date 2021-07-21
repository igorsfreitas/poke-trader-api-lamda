import { BaseController } from "src/infra/BaseController"
import { AddProposalDto } from "../../dto"
import { AddProposalUseCase } from "./implementation"

export class AddProposalController extends BaseController {

    constructor(private readonly useCase: AddProposalUseCase) {
        super()
    }

    public async executeImpl(req: any): Promise<any> {
        try {
            const dto: AddProposalDto = {
                pokemonsOffered: req.body.pokemonsOffered,
                userOfered: req.body.userOfered
            } as AddProposalDto

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
