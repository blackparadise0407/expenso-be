import { model, Schema } from 'mongoose';

export interface Category {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  createdById: string;
}

const schema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      default: '',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    createdById: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

schema.set('toJSON', {
  virtuals: true,
});

export const CategoryModel = model('Category', schema);
