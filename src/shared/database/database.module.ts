import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoriesRepository],
  exports: [UsersRepository, CategoriesRepository],
})
export class DatabaseModule {}
