import { Exclude } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import { Category } from '@/models/category.model';

type ICreateCategoryDTO = Pick<
  Category,
  'name' | 'createdById' | 'description' | 'imgUrl'
>;
export class CreateCategoryDTO implements ICreateCategoryDTO {
  @IsNotEmpty()
  createdById: string;

  description: string;

  imgUrl: string;

  @Length(3, 20)
  name: string;
}

type IUpdateCategoryDTO = Pick<
  Category,
  'imgUrl' | 'name' | 'description' | 'createdById'
>;

export class UpdateCategoryDTO implements IUpdateCategoryDTO {
  @IsOptional()
  imgUrl: string;

  @IsString()
  @IsOptional()
  name: string;

  @MaxLength(200)
  @IsString()
  @IsOptional()
  description: string;

  @Exclude()
  createdById: string;
}
