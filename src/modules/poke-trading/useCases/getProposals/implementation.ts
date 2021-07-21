import { GenericAppError } from "src/core/logic/AppError"
import { Either, Result, right } from "src/core/logic/Result"
import { UseCase } from "src/infra/UseCase"
import { ResAddProposalDto } from "../../dto"
import { TransactionMapper } from "../../mappers/transactionMapper"
import { ITransactionRepo } from "../../repos/transactionRepo"

type Response = Either<
  GenericAppError.UnexpectedError,
  Result<ResAddProposalDto[]>
>

export class GetProposalsUseCase implements UseCase<ResAddProposalDto, Promise<Response>> {

  constructor (
    private readonly transactionRepo: ITransactionRepo
  ) { }

  public async execute (): Promise<Response> {

      const proposals = await this.transactionRepo.getTransactions()

      return right(Result.ok<ResAddProposalDto[]>(TransactionMapper.toDtoGetProposals(proposals))) as Response

  }

}
