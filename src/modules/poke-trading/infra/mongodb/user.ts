import { model, Schema, Document } from 'mongoose'
import { schemaWithSnowflake } from '../../../../utils/schema/schemaWithSnowflake'

export interface IUserModel extends Document {
  createdAt: Date
}

const schema = schemaWithSnowflake(new Schema({
    name: {
        type: String,
        required: true,
    },
    pokemons: {
        type: [Object],
        required: true
    },
    createdAt: {
        type: Date,
        required: false,
    }
}, { timestamps: true }))

export default model<IUserModel>("user", schema, "users", true)
