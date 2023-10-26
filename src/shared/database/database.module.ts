import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountsRepository } from './repositories/bank-accounts.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { UsersRepository } from './repositories/users.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
  ],
  exports: [UsersRepository, CategoriesRepository, BankAccountsRepository],
})
export class DatabaseModule {}
