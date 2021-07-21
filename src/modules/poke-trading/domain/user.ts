import { Entity } from "../../../core/domain/Entity"
import { Result } from "../../../core/logic/Result"
import { Guard } from "../../../core/logic/Guard"

interface UserProps {
    id?: string
    name: string
    pokemons: string[]
    createdAt?: Date
}

export class User extends Entity<UserProps> {
    private constructor(props: UserProps, id?: string) {
        super(props, id)
    }

    get name(): string {
        return this.props.name
    }

    get pokemons(): string[] {
      return this.props.pokemons
    }

    get createdAt(): Date {
        return this.props.createdAt
    }

    public static create(
        props: UserProps,
        id?: string
    ): Result<User> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "name" },
            { argument: props.pokemons, argumentName: "pokemons" },
        ])

        if (!guardResult.succeeded) {
            return Result.fail<User>(guardResult.message)
        } else {
            return Result.ok<User>(
                new User(
                    {
                        ...props,
                    },
                    id
                )
            )
        }
    }
}
