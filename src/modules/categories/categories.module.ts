import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './services/categories.service';
import { CategoryOwnershipValidationService } from './services/category-ownership-validation.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryOwnershipValidationService],
  exports: [CategoryOwnershipValidationService],
})
export class CategoriesModule {}
