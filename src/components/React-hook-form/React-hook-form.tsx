import { useNavigate } from 'react-router-dom';
import { selectCountries } from '../../store/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../../store/store';
import styles from '../Uncontrolled-form/forms.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setFormData } from '../../store/reducers/formSlice';
import { convertImageToBase64 } from '../../utils/convertImage';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/validation';
import { FormType } from '../../types/types';

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: yupResolver<FormType>(schema),
    mode: 'all',
  });
  const countries = useAppSelector(selectCountries());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    let convertedImage;
    const file = getValues('image');
    if (file instanceof FileList) {
      convertedImage = await convertImageToBase64(file[0]);
    }

    dispatch(
      setFormData({
        ...data,
        gender:
          getValues('gender') === 'male'
            ? 'male'
            : getValues('gender') === 'female'
              ? 'female'
              : '',
        agreement: getValues('agreement') === true ? 'accepted' : '',
        image: convertedImage,
      })
    );
    navigate('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.form__fieldset}>
        <h2 className={styles.form__title}>React Hook form</h2>
        <div className={styles.form__wrapper}>
          <label htmlFor="name">Name</label>
          <input
            className={`${errors?.name ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="text"
            id="name"
            placeholder="Name..."
            {...register('name')}
          />
          {errors.name && (
            <p className={styles.form__error}>{errors.name?.message}</p>
          )}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="age">Age</label>
          <input
            className={`${errors?.age ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="number"
            id="age"
            {...register('age')}
            placeholder="Age..."
          />
          {errors.age && (
            <p className={styles.form__error}>{errors.age?.message}</p>
          )}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="email">Email</label>
          <input
            className={`${errors?.email ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="email"
            id="email"
            {...register('email')}
            placeholder="Email..."
          />
          {errors.email && (
            <p className={styles.form__error}>{errors.email?.message}</p>
          )}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="password">Password</label>
          <input
            className={`${errors?.password ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="password"
            id="password"
            {...register('password')}
            placeholder="Password..."
          />
          {errors.password && (
            <p className={styles.form__error}>{errors.password?.message}</p>
          )}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            className={`${errors?.confirmPassword ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="password"
            id="confirm-password"
            {...register('confirmPassword')}
            placeholder="Confirm password..."
          />
          {errors.confirmPassword && (
            <p className={styles.form__error}>
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="country">Country</label>
          <input
            className={`${errors?.country ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="text"
            id="country"
            {...register('country')}
            list="countryList"
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </datalist>
          {errors.country && (
            <p className={styles.form__error}>{errors.country?.message}</p>
          )}
        </div>
        <fieldset className={styles.form__genders}>
          <legend className={styles.form__picture}>Gender</legend>
          <div className={styles.form__radio}>
            <input
              type="radio"
              id="male"
              {...register('gender')}
              value="male"
            />
            <label htmlFor="male">male</label>
          </div>
          <div className={styles.form__radio}>
            <input
              type="radio"
              id="female"
              {...register('gender')}
              value="female"
            />
            <label htmlFor="female">female</label>
          </div>
          {errors.gender && (
            <p className={styles.form__error}>{errors.gender?.message}</p>
          )}
        </fieldset>
        <fieldset className={styles.form__image}>
          <label className={styles.form__picture} htmlFor="image">
            Upload image
          </label>
          <input type="file" id="image" {...register('image')} />
          {errors.image && (
            <p className={styles.form__error}>{errors.image?.message}</p>
          )}
        </fieldset>
        <fieldset className={styles.form__agree}>
          <div className={styles.form__radio}>
            <input type="checkbox" id="agreement" {...register('agreement')} />
            <label htmlFor="agreement">I agree with terms and conditions</label>
          </div>
          {errors.agreement && (
            <p className={styles.form__error}>{errors.agreement?.message}</p>
          )}
        </fieldset>
        <button
          className={styles.form__button}
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </fieldset>
    </form>
  );
}
