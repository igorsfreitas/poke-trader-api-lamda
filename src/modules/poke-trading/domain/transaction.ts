import { Entity } from "../../../core/domain/Entity"
import { Result } from "../../../core/logic/Result"
import { Guard } from "../../../core/logic/Guard"

interface TransactionProps {
    id?: string
    userOfered: string
    userAccepted?: string
    pokemonsOffered: string[]
    pokemonsAccepted?: string[]
    acceptDate?: Date
    createdAt?: Date
}

export class Transaction extends Entity<TransactionProps> {
    private constructor(props: TransactionProps, id?: string) {
        super(props, id)
    }

    get userOfered(): string {
        return this.props.userOfered
    }

    get userAccepted(): string {
        return this.props.userAccepted
    }

    get pokemonsOffered(): string[] {
      return this.props.pokemonsOffered
    }

    get pokemonsAccepted(): string[] {
      return this.props.pokemonsAccepted
    }

    get acceptDate(): Date {
        return this.props.acceptDate
    }

    get createdAt(): Date {
        return this.props.createdAt
    }

    public static create(
        props: TransactionProps,
        id?: string
    ): Result<Transaction> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.userOfered, argumentName: "userOfered" },
            { argument: props.pokemonsOffered, argumentName: "pokemonsOffered" },
        ])

        if (!guardResult.succeeded) {
            return Result.fail<Transaction>(guardResult.message)
        } else {
            return Result.ok<Transaction>(
                new Transaction(
                    {
                        ...props,
                    },
                    id
                )
            )
        }
    }
}
