import styles from './Password-srength.module.css';

const PasswordStrength = ({ password }: { password: string }) => {
  let num: number = 0;

  if (/[a-z]/.test(password)) num += 1;
  if (/[A-Z]/.test(password)) num += 1;
  if (/\d/.test(password)) num += 1;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) num += 1;

  const setPasswordStrength = () => ({
    width: `${num * 25}%`,
    background: PasswordStrengthColor(),
    height: '0.5rem',
    borderRadius: '0.19rem',
  });

  const PasswordStrengthColor = () => {
    switch (num) {
      case 0:
        return '#d5d0d0';
      case 1:
        return '#FF0000';
      case 2:
        return '#ffa500';
      case 3:
        return '#4d6aeb';
      case 4:
        return '#00FF00';
      default:
        return '#d5d0d0';
    }
  };

  if (!password) {
    return (
      <>
        <div className={styles.password__strength}>
          <div className={styles.password__default}></div>
        </div>
        <p style={{ color: '#d5d0d0' }}></p>
      </>
    );
  } else
    return (
      <>
        <div className={styles.password__strength}>
          <div style={setPasswordStrength()}></div>
        </div>
        <p style={{ color: PasswordStrengthColor() }}></p>
      </>
    );
};

export default PasswordStrength;
