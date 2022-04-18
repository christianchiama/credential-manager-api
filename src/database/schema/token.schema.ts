import { SCHEMA_NAME } from '@config/index'
import { TokenDocument } from '@type/token'
import { Schema, model, SchemaTypes } from 'mongoose'

const tokenSchema: Schema = new Schema(
  {
    token: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: SCHEMA_NAME.USER,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Token = model<TokenDocument>(SCHEMA_NAME.TOKEN, tokenSchema)

export { Token }
