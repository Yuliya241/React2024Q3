import { FormEvent, useRef } from 'react';
import styles from './forms.module.css';
import { FormData } from '../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setFormData } from '../../store/reducers/formSlice';
import { useNavigate } from 'react-router-dom';
import { selectCountries } from '../../store/selectors/selectors';
import { convertImageToBase64 } from '../../utils/convertImage';

export default function UnControlledForm() {
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const maleInput = useRef<HTMLInputElement>(null);
  const femaleInput = useRef<HTMLInputElement>(null);
  const agreementInput = useRef<HTMLInputElement>(null);
  const pictureInput = useRef<HTMLInputElement>(null);
  const countryInput = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector(selectCountries());

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
      picture: pictureInput.current?.files,
      country: countryInput.current?.value,
    };

    let convertedImage;
    if (pictureInput.current?.files?.[0]) {
      convertedImage = await convertImageToBase64(
        pictureInput.current?.files[0]
      );
    }
    dispatch(setFormData({ ...newFormData, picture: convertedImage }));
    navigate('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.form__fieldset}>
        <h2 className={styles.form__title}>Uncontrolled form</h2>
        <div className={styles.form__wrapper}>
          <label htmlFor="name">Name</label>
          <input
            className={styles.form__input}
            type="text"
            id="name"
            placeholder="Name..."
            name="name"
            ref={nameInput}
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="age">Age</label>
          <input
            className={styles.form__input}
            type="number"
            id="age"
            name="age"
            placeholder="Age..."
            ref={ageInput}
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.form__input}
            type="email"
            id="email"
            name="email"
            placeholder="Email..."
            ref={emailInput}
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="password">Password</label>
          <input
            className={styles.form__input}
            type="password"
            id="password"
            name="password"
            placeholder="Password..."
            ref={passwordInput}
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            className={styles.form__input}
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Confirm password..."
            ref={confirmPasswordInput}
          />
        </div>
        <div className={styles.form__wrapper}>
          <label htmlFor="country">Country</label>
          <input
            className={styles.form__input}
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
        </div>
        <fieldset className={styles.form__buttons}>
          <legend className={styles.form__gender}>Gender</legend>
          <div className={styles.form__radio}>
            <input
              className={styles.form__input}
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
              className={styles.form__input}
              type="radio"
              id="female"
              name="gender"
              value="female"
              ref={femaleInput}
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
            name="picture"
            accept=".jpeg,.png"
            ref={pictureInput}
          />
        </fieldset>
        <fieldset className={styles.form__buttons}>
          <div className={styles.form__radio}>
            <input
              className={styles.form__input}
              type="checkbox"
              id="agreement"
              name="agreement"
              ref={agreementInput}
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