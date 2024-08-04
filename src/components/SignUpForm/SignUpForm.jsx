import css from "../SignInForm/SignInForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Logo from "../Logo/Logo.jsx";

import { register as registerUser } from "../../redux/auth/operations.js";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    dispatch(registerUser({ email, password }))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        reset();
        navigate("/tracker");
      })
      .catch((err) => {
        toast.error("Registration failed");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.signInContainer}>
      <div className={css.signInForm}>
        <div className={css.formSection}>
          <Logo />
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={css.formTitle}>Sign Up</h2>
            <div className={css.inputContainer}>
              <label className={css.formLabel}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
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
                  {...register("password")}
                />
                <span
                  className={css.togglePassword}
                  onClick={togglePasswordVisibility}
                >
                  <svg className={css.icon}>
                    <use
                      href={`../../../assets/sprite.svg#${
                        showPassword ? "icon-eye" : "icon-eye-off"
                      }`}
                    />
                  </svg>
                </span>
              </div>
              {errors.password && (
                <p className={css.errorText}>{errors.password.message}</p>
              )}
            </div>
            <div className={css.inputContainer}>
              <label className={css.formLabel}>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className={css.errorText}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              disabled={!isDirty || !isValid}
              className={css.btnform}
              type="submit"
            >
              Sign Up
            </button>
            <div className={css.spanSignIn}>
              <p>Already have an account? </p>
              <Link className={css.link} to="/signin">
                Sign In
              </Link>
            </div>
          </form>
        </div>
        {/* <div className={css.imageSection}>
          <AdvantagesSection /> тут буде секція
        </div> */}
      </div>
    </div>
  );
};

export default SignUpForm;
