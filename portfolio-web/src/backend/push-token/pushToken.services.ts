import { PushTokenQueries } from './pushToken.queries';
import { PushTokenSchema } from './pushToken.schemaValidation';
import { PushTokenType } from './pushToken.types';

export const PushTokenServices = {
  async savePushToken(data: PushTokenType) {
    const parsed = PushTokenSchema.parse(data);

    const existing = await PushTokenQueries.findByToken(parsed.token);

    if (existing) {
      await PushTokenQueries.updateLastUsedAt(existing._id.toString());
      return { updated: true };
    }

    await PushTokenQueries.create({
      token: parsed.token,
      device: parsed.device ?? 'android',
      createdAt: new Date(),
      lastUsedAt: new Date(),
    });

    return { created: true };
  },

  async getAllTokens() {
    return PushTokenQueries.findAll();
  },
};
