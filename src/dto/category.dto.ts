import { IsNotEmpty, Length } from 'class-validator';

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
