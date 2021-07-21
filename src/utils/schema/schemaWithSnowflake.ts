// @ts-ignore
import * as mongoose from 'mongoose'
import { Flake } from '../generators/snowflake'
require('mongoose-long')(mongoose)

const SchemaTypes: any = mongoose.Schema.Types


export const schemaWithSnowflake = (schema: mongoose.Schema) => {
  schema.add({
    _id: {
      type: SchemaTypes.Long,
      default: () => Flake.gen()
    },
    id: {
      type: String,
    },
    id_str: {
      type: String
    }
  })

  schema.pre('save', function (next) {
    if (!this.get('id') || !this.get('id_str')) {
      this.set('id_str', this._id)
      this.set('id', this._id)
    }
    next()
  })

  return schema
}
