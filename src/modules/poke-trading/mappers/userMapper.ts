import { Result } from "src/core/logic/Result"
import { User } from "../domain/user"
import { ResAddUserDto } from "../dto"

export class UserMapper {

    public static toDomain (raw): User {

        const {
            id,
            name,
            pokemons,
            createdAt
        } = raw

        const user = User.create({
            name,
            pokemons,
            createdAt
        }, id)

        if (user.isFailure) {
            console.error(`UserMapper error: ${user.error.toString()}`)
            throw new Error(user.error.toString())
        }

        return user.getValue()
    }

    public static toDomainGetUsers (raw): User[] {

        const users = raw.map( item => {

            const {
                id,
                name,
                pokemons,
                createdAt
            } = item

            const user = User.create({
                name,
                pokemons,
                createdAt
            }, id)

            if (user.isFailure) {
                console.error(`UserMapper error: ${user.error.toString()}`)
                throw new Error(user.error.toString())
            }

            return user.getValue()
        } )
        
        return users
    }

    public static toDto(user: User): ResAddUserDto {
        const dto: ResAddUserDto = {
            name: user.name,
            pokemons: user.pokemons
        }

        return dto
    }

    public static toDtoGetUsers(users: any[]): ResAddUserDto[] {
        const res = users.map( item => {
            const dto: ResAddUserDto = {
                id: item._id,
                name: item.name,
                pokemons: item.pokemons
            }
    
            return dto
        })
        return res
    }

    public static toPersistence (user): any {
        return {
          name: user.name.toString(),
          pokemons: user.pokemons,
          createdAt: user.createdAt 
        }
      }

}
