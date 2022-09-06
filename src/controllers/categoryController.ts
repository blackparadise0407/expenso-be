import { catchAsync } from '@/common/helpers/catchAsync';

export const categoryController = {
  a: catchAsync((req, res) => {
    res.send('a');
  }),
};
