import styles from './SignUpForm.module.css'; // оновлено імпорт
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Logo from '../Logo/Logo.jsx';
import { icons as sprite } from '../../assets/index.js';
import { register as registerUser } from '../../redux/auth/operations.js';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async data => {
    const { confirmPassword, ...submitData } = data;
    const { email, password } = submitData;

    dispatch(registerUser({ email, password }))
      .unwrap()
      .then(res => {
        reset();
        toast.success(res.message);
      })
      .catch(err => {
        toast.error('Registration failed');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    if (errors.email) {
      toast.error('Invalid email format - test@example.com');
    }

    if (errors.password) {
      toast.error('Password must be at least 8 characters long');
    }
    if (errors.confirmPassword) {
      toast.error('Passwords must match');
    }
  }, [errors.email, errors.password, errors.confirmPassword]);

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpWrapper}>
        <div className={styles.formSection}>
          <Logo />
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.formTitle}>Sign Up</h2>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
              />
              {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
                />
                <svg
                  width="20"
                  height="20"
                  className={styles.togglePassword}
                  onClick={togglePasswordVisibility}
                >
                  <use xlinkHref={`${sprite}#${showPassword ? 'icon-eye' : 'icon-eye-off'}`} />
                </svg>
              </div>
              {errors.password && <p className={styles.errorText}>{errors.password.message}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Confirm Password</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  {...register('confirmPassword')}
                  className={`${styles.input} ${errors.confirmPassword ? styles.errorInput : ''}`}
                />
                <svg
                  width="20"
                  height="20"
                  className={styles.togglePassword}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <use
                    xlinkHref={`${sprite}#${showConfirmPassword ? 'icon-eye' : 'icon-eye-off'}`}
                  />
                </svg>
              </div>
              {errors.confirmPassword && (
                <p className={styles.errorText}>{errors.confirmPassword.message}</p>
              )}
            </div>
            <button disabled={!isDirty || !isValid} className={styles.submitButton} type="submit">
              Sign Up
            </button>
            <div className={styles.signInPrompt}>
              <p>Already have an account? </p>
              <Link className={styles.signInLink} to="/signin">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
