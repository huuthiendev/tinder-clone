import { Model, model, Schema } from 'mongoose';

export interface IReaction {
  user_id: string;
  reaction_user_id: string;
  reaction_type: IReactionType;
}

export enum IReactionType {
  like = 1,
  pass = 2
}

const ReactionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reaction_user_id: {
    type: Schema.Types.String,
    required: [true]
  },
  reaction_type: {
    type: Schema.Types.Number,
    required: [true]
  }
}, { timestamps: true });

export const Reaction: Model<IReaction> = model<IReaction>('Reaction', ReactionSchema);