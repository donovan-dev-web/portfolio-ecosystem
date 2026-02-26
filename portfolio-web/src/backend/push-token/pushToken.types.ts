export type PushTokenType = {
  token: string;
  device: 'android' | 'ios' | 'web';
  createdAt?: Date;
  lastUsedAt?: Date;
};
