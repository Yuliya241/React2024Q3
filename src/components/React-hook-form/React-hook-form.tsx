import { useNavigate } from 'react-router-dom';
import { selectCountries } from '../../store/selectors/selectors';
import { useAppDispatch, useAppSelector } from '../../store/store';
import styles from '../Uncontrolled-form/forms.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setFormData } from '../../store/reducers/formSlice';
import { convertImageToBase64 } from '../../utils/convertImage';
import { FormControlled } from '../../interfaces/interfaces';

export default function ReactHookForm() {
  const { register, handleSubmit, getValues } = useForm<FormControlled>();
  const countries = useAppSelector(selectCountries());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormControlled> = async (data) => {
    let convertedImage;
    if (data.picture instanceof FileList) {
      convertedImage = await convertImageToBase64(data.picture[0]);
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
        picture: convertedImage,
      })
    );
    navigate('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.form__fieldset}>
        <h2 className={styles.form__title}>React Hook form</h2>
        <div className={styles.form__wrapper}>
          <label htmlFor="nameI">Name</label>
          <input
            className={styles.form__input}
            type="text"
            id="nameI"
            placeholder="Name..."
            {...register('name')}
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="age">Age</label>
          <input
            className={styles.form__input}
            type="number"
            id="age"
            {...register('age')}
            placeholder="Age..."
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.form__input}
            type="email"
            id="email"
            {...register('email')}
            placeholder="Email..."
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="password">Password</label>
          <input
            className={styles.form__input}
            type="password"
            id="password"
            {...register('password')}
            placeholder="Password..."
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            className={styles.form__input}
            type="password"
            id="confirm-password"
            {...register('confirmPassword')}
            placeholder="Confirm password..."
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="country">Country</label>
          <input
            className={styles.form__input}
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
        </div>
        <fieldset className={styles.form__buttons}>
          <legend className={styles.form__gender}>Gender</legend>
          <div className={styles.form__radio}>
            <input
              className={styles.form__input}
              type="radio"
              id="male"
              {...register('gender')}
              value="male"
            />
            <label htmlFor="male">male</label>
          </div>
          <div className={styles.form__radio}>
            <input
              className={styles.form__input}
              type="radio"
              id="female"
              {...register('gender')}
              value="female"
            />
            <label htmlFor="female">female</label>
          </div>
        </fieldset>
        <fieldset className={styles.form__buttons}>
          <label className={styles.form__picture} htmlFor="picture">
            Upload picture
          </label>
          <input
            type="file"
            id="picture"
            {...register('picture')}
            accept=".jpeg,.png"
          />
        </fieldset>
        <fieldset className={styles.form__buttons}>
          <div className={styles.form__radio}>
            <input
              className={styles.form__input}
              type="checkbox"
              id="agreement"
              {...register('agreement')}
            />
            <label htmlFor="agreement">I agree with terms and conditions</label>
          </div>
        </fieldset>
        <button className={styles.form__button} type="submit">
          Submit
        </button>
      </fieldset>
    </form>
  );
}
