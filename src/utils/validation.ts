import * as yup from 'yup';
import { countryList } from '../data/countries';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/[A-Z]/, 'First letter should be uppercase'),
  age: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .positive('Age must be a positive number')
    .integer('Please enter a valid age')
    .required('Age is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/^\S*$/, 'Password must not contain spaces')
    .matches(/\d/, 'Password must contain at least 1 number')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter')
    .matches(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Please repeat password again')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  country: yup
    .string()
    .required('Country is required')
    .oneOf(countryList, 'Enter a valid country'),
  gender: yup.string().required('Gender is required'),
  agreement: yup
    .boolean()
    .oneOf([true], 'You need to accept Terms and Conditions agreement'),
  image: yup
    .mixed()
    .required('Image is required')
    .test(
      'fileFormat',
      'Only .png and .jpg/.jpeg files are allowed',
      (value) => {
        return (
          value instanceof FileList &&
          value[0] &&
          ['image/png', 'image/jpeg', 'image/jpg'].includes(value[0].type)
        );
      }
    )
    .test(
      'fileSize',
      'File size must be less than 3MB',
      (value) =>
        value instanceof FileList && value[0] && value[0].size <= 3145728
    ),
});
