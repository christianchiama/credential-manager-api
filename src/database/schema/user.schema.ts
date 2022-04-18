import { SCHEMA_NAME } from '@config/index'
import { Schema, model, Model } from 'mongoose'
import { UserEmail, UserDocument, UserPassword } from '@type/user'
import mongooseAutopopulate from 'mongoose-autopopulate'

interface IUser extends Model<UserDocument> {
  doesEmailExist: (email: UserEmail) => Promise<boolean>
  doesPasswordMatch: (password: UserPassword) => Promise<boolean>
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    firstname: {
      type: Schema.Types.String,
      trim: true,
    },
    lastname: {
      type: Schema.Types.String,
      trim: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    enabled: {
      type: Schema.Types.Boolean,
      required: false,
      trim: true,
      default: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAME.ROLE,
      required: true,
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.statics.doesEmailExist = async function (
  email: UserEmail,
): Promise<boolean> {
  const user = await this.findOne({ email })
  return Boolean(user)
}

userSchema.methods.doesPasswordMatch = async function (
  password: UserPassword,
): Promise<boolean> {
  const user = await User.findOne({ password })
  return Boolean(user)
}

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  },
})

userSchema.plugin(mongooseAutopopulate)

const User: IUser = model<UserDocument, IUser>(SCHEMA_NAME.USER, userSchema)

export { User }
