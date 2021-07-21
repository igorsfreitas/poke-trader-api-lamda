import { model, Schema, Document } from 'mongoose'
import { schemaWithSnowflake } from '../../../../utils/schema/schemaWithSnowflake'

export interface ITransactionModel extends Document {
  createdAt: Date
}

const schema = schemaWithSnowflake(new Schema({
    userOfered: {
        type: Object,
        required: true,
    },
    userAccepted: {
        type: Object,
        required: false,
    },
    pokemonsOffered: {
        type: [Object],
        required: true
    },
    pokemonsAccepted: {
        type: [Object],
        required: false,
        default: [],
    },
    acceptDate: {
        type: Date,
        required: false,
    },
    createdAt: {
        type: Date,
        required: false,
    }
}, { timestamps: true }))

export default model<ITransactionModel>("transaction", schema, "transactions", true)
