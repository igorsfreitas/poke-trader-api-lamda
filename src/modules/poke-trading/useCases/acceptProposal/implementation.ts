import { GenericAppError } from "src/core/logic/AppError"
import { Either, Result, right } from "src/core/logic/Result"
import { UseCase } from "src/infra/UseCase"
import { ResAddProposalDto, AcceptProposalDto } from "../../dto"
import { TransactionMapper } from "../../mappers/transactionMapper"
import { ITransactionRepo } from "../../repos/transactionRepo"

type Response = Either<
  GenericAppError.UnexpectedError,
  Result<any>
>

export class AcceptProposalUseCase implements UseCase<any, Promise<Response>> {

  constructor (
    private readonly transactionRepo: ITransactionRepo
  ) { }

  public async execute (dto: AcceptProposalDto): Promise<Response> {
      const proposalAccept = await this.transactionRepo.acceptTransaction(dto.accept, dto.id)
      return right(Result.ok<ResAddProposalDto>(TransactionMapper.toDto(proposalAccept))) as Response
  }

}
