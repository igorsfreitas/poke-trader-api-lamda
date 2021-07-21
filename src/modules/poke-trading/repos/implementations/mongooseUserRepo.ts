import { Console } from "console"
import { Model } from "mongoose"
import { User } from "../../domain/user"
import { IUserModel } from "../../infra/mongodb/user"
import { UserMapper } from "../../mappers/userMapper"
import { IUserRepo } from "../userRepo"

export class UserRepo implements IUserRepo {

  constructor(
    private readonly userModel: Model<IUserModel>
  ) { }

  public async getUserById(id): Promise<User> {
    const user = await this.userModel.findById(id)

    return UserMapper.toDomain(user)
  }

  public async addUser(name, pokemons): Promise<User> {

    const user = new this.userModel((UserMapper.toPersistence({
        name,
        pokemons,
        createdAt: new Date()
      })))

    await user.save()

    return UserMapper.toDomain(user)
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.userModel.find()
    return UserMapper.toDomainGetUsers(users)
  }
}
