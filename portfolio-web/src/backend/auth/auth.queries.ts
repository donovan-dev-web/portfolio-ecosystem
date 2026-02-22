import { User } from './user.model';

export async function findUserByEmail(email: string) {
  return User.findOne({ email });
}

export async function createUser(email: string, password: string) {
  return User.create({ email, password });
}
