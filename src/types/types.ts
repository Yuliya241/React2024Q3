import { schema } from '../utils/validation';
import * as yup from 'yup';

export type Errors = {
  [field: string]: string;
};

export type FormType = yup.InferType<typeof schema>;
