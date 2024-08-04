import React, { useRef } from "react";
import css from "./UserSettingsModal.module.css";
import { useForm } from "react-hook-form";

const UserSettingsModal = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const userAvatarRef = useRef(null);

  const onSubmit = (data) => {
    const formData = new FormData();
    const keys = Object.keys(data);
    for (const key of keys) {
      formData.append(key, data[key]);
    }

    formData.append("userAvatar", userAvatarRef.current.src);

    // console.log(Object.fromEntries(formData.entries()));
  };

  let gender = watch("gender");
  let weight = watch("userWeight");
  let sportTime = watch("userSportTime");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      const avatarURL = URL.createObjectURL(file);
      userAvatarRef.current.src = avatarURL;
    }
  };

  function roundUpToTwoDecimalPlaces(num) {
    return Math.ceil(num * 100) / 100;
  }

  const calculateNormaWater = (userGender, userWeight, userSportTime) => {
    let normaWater = 0;
    if (userWeight > 0 && userSportTime > 0) {
      if (userGender === "woman") {
        normaWater = roundUpToTwoDecimalPlaces(
          userWeight * 0.03 + userSportTime * 0.4,
          3
        );
        setValue("userWater", normaWater);
        return normaWater;
      } else if (userGender === "man") {
        normaWater = roundUpToTwoDecimalPlaces(
          userWeight * 0.04 + userSportTime * 0.6
        );
        setValue("userWater", normaWater);
        return normaWater;
      }
    } else {
      return;
    }
  };

  return (
    <div className={css.settingsModal}>
      <h2 className={css.settingsModalTitle}>Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.userAvatarContainer}>
          <img
            src=""
            alt="User avatar"
            ref={userAvatarRef}
            className={css.userAvatar}
          />
          <div className={css.uploadPhotoBtnContainer}>
            <button className={css.uploadPhotoBtn}>
              <p className={css.inputText}>Upload a photo</p>
              <input
                type="file"
                className={css.fileInput}
                id="fileInput"
                name="userAvatar"
                onChange={handleFileSelect}
              />
            </button>
          </div>
        </div>
        <div className={css.settingsForm}>
          <div>
            <fieldset className={css.genderContainer}>
              <legend className={`${css.genderLegend} ${css.inputTitle}`}>
                Your gender identity
              </legend>
              <label className={`${css.genderLabel} ${css.inputText}`}>
                <input
                  type="radio"
                  value="woman"
                  name="gender"
                  {...register("gender")}
                />
                Woman
              </label>
              <label className={`${css.genderLabel} ${css.inputText}`}>
                <input
                  type="radio"
                  value="man"
                  name="gender"
                  {...register("gender")}
                />
                Man
              </label>
            </fieldset>
          </div>
          <div className={css.userInfoContainer}>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Your name
              <input
                type="text"
                name="userName"
                {...register("userName")}
                className={`${css.userInfoField} ${css.inputText}`}
              />
            </label>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Email
              <input
                type="email"
                name="userEmail"
                {...register("userEmail")}
                className={`${css.userInfoField} ${css.inputText}`}
              />
            </label>
          </div>
          <div className={css.userInfoContainer}>
            <h3 className={`${css.inputTitle}`}>My daily norma</h3>
            <div className={css.normaWaterContainer}>
              <div>
                <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>
                  For woman:
                </h4>
                <p className={css.greenText}>V=(M*0,03) + (T*0,4)</p>
              </div>
              <div>
                <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>
                  For man:
                </h4>
                <p className={css.greenText}>V=(M*0,04) + (T*0,6)</p>
              </div>
            </div>
            <div className={css.normaWaterTextContainer}>
              <p className={`${css.normaWaterText} ${css.formulaDescription}`}>
                <span className={css.greenText}>*</span> V is the volume of the
                water norm in liters per day, M is your body weight, T is the
                time of active sports, or another type of activity commensurate
                in terms of loads (in the absence of these, you must set 0)
              </p>
            </div>
            <div>
              <p className={css.inputText}>Active time in hours</p>
            </div>
          </div>
          <div className={css.userInfoContainer}>
            <label className={`${css.userInfoLabel} ${css.inputText}`}>
              Your weight in kilograms:
              <input
                type="number"
                name="userWeight"
                {...register("userWeight")}
                className={`${css.userInfoField} ${css.inputText}`}
              />
            </label>
            <label className={`${css.userInfoLabel} ${css.inputText}`}>
              The time of active participation in sports:
              <input
                type="number"
                name="userSportTime"
                {...register("userSportTime")}
                className={`${css.userInfoField} ${css.inputText}`}
              />
            </label>
          </div>
          <div className={css.userInfoContainer}>
            <div className={css.amountOfWaterContainer}>
              <p className={`${css.amountOfWaterText} ${css.inputText}`}>
                The required amount of water in liters per day:
              </p>
              <span className={css.amountOfWaterText}>
                {calculateNormaWater(gender, weight, sportTime)}L
              </span>
            </div>
            <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
              Write down how much water you will drink:
              <input
                type="text"
                name="userWater"
                {...register("userWater")}
                className={`${css.userInfoField} ${css.inputText}`}
              />
            </label>
          </div>
        </div>
        <button type="submit" className={`${css.saveBtn} ${css.inputTitle}`}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UserSettingsModal;
