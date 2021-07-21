import { Transaction } from "../domain/transaction"
import { ResAddProposalDto } from "../dto"

export class TransactionMapper {

    public static toDomain (raw): Transaction {

        const {
            id,
            userOfered,
            userAccepted,
            pokemonsOffered,
            pokemonsAccepted,
            acceptDate,
            createdAt
        } = raw

        const transaction = Transaction.create({
            userOfered,
            userAccepted,
            pokemonsOffered,
            pokemonsAccepted,
            acceptDate,
            createdAt
        }, id)

        if (transaction.isFailure) {
            console.error(`TransactionMapper error: ${transaction.error.toString()}`)
            throw new Error(transaction.error.toString())
        }

        return transaction.getValue()
    }

    public static toPersistence(transaction): any {
        return {
            userOfered: transaction.userOfered,
            pokemonsOffered: transaction.pokemonsOffered,
            createdAt: new Date()
        }   
    }

    public static toDto(proposal): ResAddProposalDto {
        return {
            id: proposal._id,
            createdAt: proposal.createdAt,
            userOfered: proposal.userOfered,
            pokemonsOffered: proposal.pokemonsOffered
        }
    }

    public static toDtoGetProposals(proposals: any[]): ResAddProposalDto[] {
        const res = proposals.map( item => {
            const dto: ResAddProposalDto = {
                id: item._id,
                userOfered: item.userOfered,
                pokemonsOffered: item.pokemonsOffered,
                createdAt: item.createdAt
            }
    
            return dto
        })
        return res
    }

}
