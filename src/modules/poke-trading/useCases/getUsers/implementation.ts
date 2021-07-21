import { GenericAppError } from "src/core/logic/AppError"
import { Either, Result, right } from "src/core/logic/Result"
import { UseCase } from "src/infra/UseCase"
import { ResAddUserDto } from "../../dto"
import { UserMapper } from "../../mappers/userMapper"
import { IUserRepo } from "../../repos/userRepo"

type Response = Either<
  GenericAppError.UnexpectedError,
  Result<ResAddUserDto[]>
>

export class GetUsersUseCase implements UseCase<ResAddUserDto, Promise<Response>> {

  constructor (
    private readonly userRepo: IUserRepo
  ) { }

  public async execute (): Promise<Response> {

      const users = await this.userRepo.getUsers()

      return right(Result.ok<ResAddUserDto[]>(UserMapper.toDtoGetUsers(users))) as Response

  }

}
