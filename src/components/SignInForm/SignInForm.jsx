import css from "../SignInForm/SignInForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Logo from "../Logo/Logo.jsx";
import { icons as sprite } from "../../assets/index.js";
import { login } from "../../redux/auth/operations.js";
import AdvantagesSection from "../AdvantagesSection/AdvantagesSection.jsx";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
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
        toast.success(res.message);
        reset();
        navigate("/tracker");
      })
      .catch((err) => {
        toast.error("Login failed");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <div className={css.imageSection}>
          <AdvantagesSection />
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
