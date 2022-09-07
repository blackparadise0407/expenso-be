import { Length } from 'class-validator';

export class CreateCategoryDTO {
  @Length(3, 20)
  name: string;
}
