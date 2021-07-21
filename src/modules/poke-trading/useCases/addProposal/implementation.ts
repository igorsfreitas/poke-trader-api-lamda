import { GenericAppError } from "src/core/logic/AppError"
import { Either, Result, right } from "src/core/logic/Result"
import { UseCase } from "src/infra/UseCase"
import { ResAddProposalDto, AddProposalDto } from "../../dto"
import { TransactionMapper } from "../../mappers/transactionMapper"
import { ITransactionRepo } from "../../repos/transactionRepo"

type Response = Either<
  GenericAppError.UnexpectedError,
  Result<ResAddProposalDto>
>

export class AddProposalUseCase implements UseCase<ResAddProposalDto, Promise<Response>> {

  constructor (
    private readonly transactionRepo: ITransactionRepo
  ) { }

  public async execute (dto: AddProposalDto): Promise<Response> {
      const proposal = await this.transactionRepo.save(dto)
      return right(Result.ok<ResAddProposalDto>(TransactionMapper.toDto(proposal))) as Response
  }

}
