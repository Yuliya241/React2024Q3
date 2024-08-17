import { FormEvent, useRef, useState } from 'react';
import styles from './forms.module.css';
import { FormData } from '../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setFormData } from '../../store/reducers/formSlice';
import { useNavigate } from 'react-router-dom';
import { selectCountries } from '../../store/selectors/selectors';
import { convertImageToBase64 } from '../../utils/convertImage';
import { getYupErrors, schema } from '../../utils/validation';
import * as yup from 'yup';
import { Errors } from '../../types/types';

export default function UnControlledForm() {
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const maleInput = useRef<HTMLInputElement>(null);
  const femaleInput = useRef<HTMLInputElement>(null);
  const agreementInput = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const countryInput = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector(selectCountries());
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFormData: FormData = {
      name: nameInput.current?.value || '',
      age: Number(ageInput.current?.value),
      email: emailInput.current?.value || '',
      password: passwordInput.current?.value || '',
      confirmPassword: confirmPasswordInput.current?.value || '',
      gender: maleInput.current?.checked
        ? maleInput.current?.value
        : femaleInput.current?.checked
          ? femaleInput.current?.value
          : '',
      agreement: agreementInput.current?.checked ? 'accepted' : '',
      image: imageInput.current?.files,
      country: countryInput.current?.value,
    };

    let convertedImage;
    if (imageInput.current?.files?.[0]) {
      convertedImage = await convertImageToBase64(imageInput.current?.files[0]);
    }

    try {
      await schema.validate(newFormData, { abortEarly: false });
      dispatch(setFormData({ ...newFormData, image: convertedImage }));
      navigate('/');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = getYupErrors(error);
        setErrors(errors);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.form__fieldset}>
        <h2 className={styles.form__title}>Uncontrolled form</h2>
        <div className={styles.form__wrapper}>
          <label htmlFor="name">Name</label>
          <input
            className={`${errors?.name ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="text"
            id="name"
            placeholder="Name..."
            name="name"
            ref={nameInput}
          />
          {errors.name && <p className={styles.form__error}>{errors.name}</p>}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="age">Age</label>
          <input
            className={`${errors?.age ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="number"
            id="age"
            name="age"
            placeholder="Age..."
            ref={ageInput}
          />
          {errors.age && <p className={styles.form__error}>{errors.age}</p>}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="email">Email</label>
          <input
            className={`${errors?.email ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="email"
            id="email"
            name="email"
            placeholder="Email..."
            ref={emailInput}
          />
          {errors.email && <p className={styles.form__error}>{errors.email}</p>}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="password">Password</label>
          <input
            className={`${errors?.password ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="password"
            id="password"
            name="password"
            placeholder="Password..."
            ref={passwordInput}
          />
          {errors.password && (
            <p className={styles.form__error}>{errors.password}</p>
          )}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            className={`${errors?.confirmPassword ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Confirm password..."
            ref={confirmPasswordInput}
          />
          {errors.confirmPassword && (
            <p className={styles.form__error}>{errors.confirmPassword}</p>
          )}
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="country">Country</label>
          <input
            className={`${errors?.country ? `${styles.form__input} ${styles.error}` : `${styles.form__input}`}`}
            type="text"
            id="country"
            name="country"
            list="countryList"
            ref={countryInput}
          />
          <datalist id="countryList">
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </datalist>
          {errors.country && (
            <p className={styles.form__error}>{errors.country}</p>
          )}
        </div>
        <fieldset className={styles.form__genders}>
          <legend className={styles.form__picture}>Gender</legend>
          <div className={styles.form__radio}>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              ref={maleInput}
            />
            <label htmlFor="male">male</label>
          </div>
          <div className={styles.form__radio}>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              ref={femaleInput}
            />
            <label htmlFor="female">female</label>
          </div>
          {errors.gender && (
            <p className={styles.form__error}>{errors.gender}</p>
          )}
        </fieldset>
        <fieldset className={styles.form__image}>
          <label className={styles.form__picture} htmlFor="image">
            Upload image
          </label>
          <input type="file" id="image" name="image" ref={imageInput} />
          {errors.image && <p className={styles.form__error}>{errors.image}</p>}
        </fieldset>
        <fieldset className={styles.form__agree}>
          <div className={styles.form__radio}>
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              ref={agreementInput}
            />
            <label htmlFor="agreement">I agree with terms and conditions</label>
          </div>
          {errors.agreement && (
            <p className={styles.form__error}>{errors.agreement}</p>
          )}
        </fieldset>
        <button className={styles.form__button} type="submit">
          Submit
        </button>
      </fieldset>
    </form>
  );
}
