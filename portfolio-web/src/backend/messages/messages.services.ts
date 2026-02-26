import { MessageQueries } from './messages.queries';
import { MessagesSchema, MessageReadSchema } from './messages.schemaValidation';
import { MessageType, MessageReadUpdate } from './messages.types';

export const MessagesServices = {
  craeteMessage: (data: MessageType) => {
    const parsed = MessagesSchema.parse(data);

    return MessageQueries.craeteMessage({
      ...parsed,
      read: false,
      dateSent: new Date(),
    });
  },
  getAll: () => MessageQueries.getAll(),
  getOneMessage: (id: string) => MessageQueries.getOneMessage(id),
  setMessageAsRead: async (id: string, data: MessageReadUpdate) => {
    const parsed = MessageReadSchema.parse(data);

    return MessageQueries.setMessageAsRead(id, {
      ...parsed,
      dateRead: parsed.dateRead || new Date(),
    });
  },
  deleteOneMessage: (id: string) => MessageQueries.deleteOneMessage(id),
};
