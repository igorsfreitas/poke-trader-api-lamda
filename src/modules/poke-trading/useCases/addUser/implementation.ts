import { GenericAppError } from "src/core/logic/AppError"
import { Either, Result, right } from "src/core/logic/Result"
import { UseCase } from "src/infra/UseCase"
import { Flake } from "src/utils/generators/snowflake"
import { PokeApi } from "src/utils/pokemons/apiPokemons"
import { ResAddUserDto, AddUserDto } from "../../dto"
import { UserMapper } from "../../mappers/userMapper"
import { IUserRepo } from "../../repos/userRepo"

type Response = Either<
  GenericAppError.UnexpectedError,
  Result<ResAddUserDto>
>

export class AddUserUseCase implements UseCase<ResAddUserDto, Promise<Response>> {

  constructor (
    private readonly userRepo: IUserRepo
  ) { }

  public async execute (dto: AddUserDto): Promise<Response> {

      const pokemons = await PokeApi.getRandomPokemons()


      const pokes = pokemons.map(poke => ({
        id: poke.data.name + Flake.gen(),
        name: poke.data.name,
        base_experience: poke.data.base_experience,
        img: poke.data.sprites.front_default
      }))

      const user = await this.userRepo.addUser(dto.name, pokes)

      return right(Result.ok<ResAddUserDto>(UserMapper.toDto(user))) as Response

  }

}
