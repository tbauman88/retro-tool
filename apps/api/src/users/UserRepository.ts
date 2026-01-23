import { User } from '@prisma/client';
import { prisma } from '../prismaClient';

type UserModel = typeof prisma.user;
type UpdateUserArgs = Parameters<UserModel['update']>[0]['data'];

export class UserRepository {
  updateById(id: User['id'], data: UpdateUserArgs) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}
