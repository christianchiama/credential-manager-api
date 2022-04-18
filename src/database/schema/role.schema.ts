import { model, Schema } from 'mongoose'

import { Role as IRole, ROLE_NAME } from '@type/role'
import { SCHEMA_NAME, ROLE } from '../../config/index'

const roleSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
    default: ROLE.USER,
  },
  description: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
})

roleSchema.statics.doesRoleExist = async function (
  name: ROLE_NAME,
): Promise<boolean> {
  const role = await this.findOne({ name })
  return Boolean(role)
}

roleSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  },
})

const Role = model<IRole>(SCHEMA_NAME.ROLE, roleSchema)

export { Role }
