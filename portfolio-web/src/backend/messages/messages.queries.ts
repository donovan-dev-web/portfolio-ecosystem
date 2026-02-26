import { Messages } from './messages.models';
import { MessageType, MessageReadUpdate } from './messages.types';

export const MessageQueries = {
  craeteMessage: (data: MessageType) => new Messages(data).save(),

  findPaginated: (skip: number, limit: number) =>
    Messages.find().sort({ dateSent: -1 }).skip(skip).limit(limit),

  countAll: () => Messages.countDocuments(),

  getAll: () => Messages.find().sort({ dateSent: 1 }),

  getOneMessage: (id: string) => Messages.findById(id),

  setMessageAsRead: (id: string, data: MessageReadUpdate) =>
    Messages.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    }),

  deleteOneMessage: (id: string) => Messages.findByIdAndDelete(id),
};
