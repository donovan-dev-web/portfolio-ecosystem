import { User } from './user.model';

export async function findUserByEmail(email: string) {
  return User.findOne({ email });
}

export async function createUser(email: string, password: string) {
  return User.create({ email, password });
}

export async function findUserById(id: string) {
  return User.findById(id);
}

export async function listUsers() {
  return User.find().sort({ createdAt: 1 });
}

export async function countUsers() {
  return User.countDocuments();
}

export async function updateUser(
  id: string,
  data: { email?: string; password?: string }
) {
  return User.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    runValidators: true,
  });
}

export async function deleteUser(id: string) {
  return User.findByIdAndDelete(id);
}
