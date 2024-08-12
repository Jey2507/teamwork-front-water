import css from "../SignInForm/SignInForm.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Logo from "../Logo/Logo.jsx";
import { icons as sprite } from "../../assets/index.js";
import { login, refreshUser } from "../../redux/auth/operations.js";
import { selectIsLoggegIn } from "../../redux/auth/selectors.js";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggegIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [isLoggedIn, dispatch]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format"
      )
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    trigger,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        reset();
      })
      .catch((err) => {
        toast.error("Login failed");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (errors.email) {
      toast.error("Invalid email format - test@example.com");
    }

    if (errors.password) {
      toast.error("Password must be at least 8 characters long");
    }
  }, [errors.email, errors.password]);

  const getInputClass = (fieldName) => {
    return errors[fieldName] ? css.error : "";
  };

  return (
    <div className={css.signInContainer}>
      <div className={css.signInForm}>
        <div className={css.formSection}>
          <Logo className={css.logo} />
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={css.formTitle}>Sign In</h2>
            <div className={css.inputContainer}>
              <label className={css.formLabel}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={getInputClass("email")}
                {...register("email")}
                onBlur={() => trigger("email")}
              />
              {errors.email && (
                <p className={css.errorText}>{errors.email.message}</p>
              )}
            </div>
            <div className={css.inputContainer}>
              <label className={css.formLabel}>Password</label>
              <div className={css.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={getInputClass("password")}
                  {...register("password")}
                  onBlur={() => trigger("password")}
                />
                <svg
                  width="20"
                  height="20"
                  className={css.togglePassword}
                  onClick={togglePasswordVisibility}
                >
                  <use
                    xlinkHref={`${sprite}#${
                      showPassword ? "icon-eye" : "icon-eye-off"
                    }`}
                  />
                </svg>
              </div>
              {errors.password && (
                <p className={css.errorText}>{errors.password.message}</p>
              )}
            </div>
            <button
              disabled={!isDirty || !isValid}
              className={css.btnform}
              type="submit"
            >
              Sign In
            </button>
            <div className={css.spanSignIn}>
              <p>Don’t have an account? </p>
              <Link className={css.link} to="/signup">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
