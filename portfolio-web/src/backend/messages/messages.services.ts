import { MessageQueries } from './messages.queries';
import { MessagesSchema, MessageReadSchema } from './messages.schemaValidation';
import { MessageType, MessageReadUpdate } from './messages.types';
import { PushNotificationService } from '../config/pushNotification.service';

export const MessagesServices = {
  craeteMessage: async (data: MessageType) => {
    const parsed = MessagesSchema.parse(data);

    const created = await MessageQueries.craeteMessage({
      ...parsed,
      read: false,
      dateSent: new Date(),
    });

    await PushNotificationService.sendNotification(
      'Nouveau message',
      `Message de ${created.name}`,
      {
        messageId: created._id.toString(),
      }
    );

    return created;
  },
  async getPaginated(page = 1, limit = 20) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));

    const skip = (safePage - 1) * safeLimit;

    const [messages, total] = await Promise.all([
      MessageQueries.findPaginated(skip, safeLimit),
      MessageQueries.countAll(),
    ]);

    return {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
      data: messages,
    };
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
