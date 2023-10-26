import { Module } from '@nestjs/common';
import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountOwnershipValidationService } from './services/bank-account-ownership-validation.service';
import { BankAccountsService } from './services/bank-accounts.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, BankAccountOwnershipValidationService],
  exports: [BankAccountOwnershipValidationService],
})
export class BankAccountsModule {}
