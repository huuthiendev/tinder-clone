import { Model, model, Schema } from 'mongoose';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
}

const UserSchema = new Schema({
  firstName: {
    type: Schema.Types.String,
    required: [true]
  },
  lastName: {
    type: Schema.Types.String,
    required: [true]
  },
  picture: {
    type: Schema.Types.String,
    required: [true]
  },
  gender: {
    type: Schema.Types.String,
    required: [true]
  },
  dateOfBirth: {
    type: Schema.Types.String,
    required: [true]
  },
  email: {
    type: Schema.Types.String,
    required: [true]
  },
  phone: {
    type: Schema.Types.String,
    required: [true]
  }
}, { timestamps: true });

export const User: Model<IUser> = model<IUser>('User', UserSchema);