import { PushToken } from './pushToken.models';
import { PushTokenType } from './pushToken.types';

export const PushTokenQueries = {
  findByToken: (token: string) => {
    return PushToken.findOne({ token });
  },

  create: (data: PushTokenType) => {
    return PushToken.create(data);
  },

  updateLastUsedAt: (id: string) => {
    return PushToken.findByIdAndUpdate(id, {
      lastUsedAt: new Date(),
    });
  },

  findAll: () => {
    return PushToken.find();
  },
};
