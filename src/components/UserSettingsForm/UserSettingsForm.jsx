import { useRef, useEffect, useState } from 'react';
import css from './UserSettingsForm.module.css';
import { useForm } from 'react-hook-form';
import { icons as sprite } from '../../assets/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectDailyNorma, selectUser } from '../../redux/auth/selectors.js';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { closeModal } from '../../redux/ModalSlice.js';
import { updateUser } from '../../redux/auth/operations.js';

const schema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  email: yup.string().email('Email is invalid').required('Email is required!'),
  gender: yup.string().oneOf(['male', 'female']).required(),
  weight: yup
    .number('Please, enter a number')
    .typeError('Please, enter a number')
    .min(0, 'Weight greater or equal to 0 kg!')
    .max(300, 'Weight must be less than 300 kg!'),
  dailyTimeActivity: yup
    .number('Please, enter a number')
    .typeError('Please, enter a number')
    .min(0, 'Daily time activity greater or equal to 0 hours!')
    .max(8, 'Daily time activity must be less than 8 hours!'),
  dailyNorma: yup
    .number('Please, enter a number')
    .typeError('Please, enter a number')
    .min(0, 'Daily norma greater or equal to 0 liters!')
    .max(10, 'Daily norma must be less than 10 liters!'),
});

const UserSettingsForm = () => {
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const DailyNorma = useSelector(selectDailyNorma);
  const { name, gender, avatar, weight, email, dailyTimeActivity, dailyNorma } =
    useSelector(selectUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      dailyNorma: dailyNorma,
    },
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const userAvatarRef = useRef(null);
  const dispatch = useDispatch();

  let userGender = watch('gender');
  let userWeight = watch('weight');
  let userSportTime = watch('dailyTimeActivity');

  useEffect(() => {
    if (name) {
      setValue('name', name);
      setValue('email', email);
      setValue('gender', gender);
      setValue('weight', weight);
      setValue('dailyTimeActivity', dailyTimeActivity);
      userAvatarRef.current.src = avatar;
    }
  }, [name, gender, avatar, weight, dailyTimeActivity, dailyNorma, email, setValue]);

  const onSubmit = async data => {
    const formData = new FormData();
    const keys = Object.keys(data);
    for (const key of keys) {
      formData.append(key, data[key]);
    }

    if (selectedAvatarFile) {
      formData.append('avatar', selectedAvatarFile);
    }

    try {
      await dispatch(updateUser(formData)).unwrap();
      dispatch(closeModal());
      toast.success('The changes were successfully applied!');
    } catch (error) {
      toast.error('Failed to apply changes!');
    }

    dispatch(closeModal());
  };

  const handleFileSelect = event => {
    const file = event.target.files[0];
    if (file) {
      const avatarURL = URL.createObjectURL(file);
      userAvatarRef.current.src = avatarURL;
      setSelectedAvatarFile(file);
    }
  };

  function roundUpToTwoDecimalPlaces(num) {
    return Math.ceil(num * 100) / 100;
  }

  const calculateNormaWater = (userGender, userWeight, userSportTime) => {
    let normaWater = 0;

    if (userWeight >= 0 && userSportTime >= 0) {
      if (userGender === 'female') {
        normaWater = roundUpToTwoDecimalPlaces(userWeight * 0.03 + userSportTime * 0.4);
      } else if (userGender === 'male') {
        normaWater = roundUpToTwoDecimalPlaces(userWeight * 0.04 + userSportTime * 0.6);
      }
      setValue('dailyNorma', DailyNorma);
      return normaWater;
    }
    return normaWater;
  };

  let normaWater = calculateNormaWater(userGender, userWeight, userSportTime);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingsForm}>
      <div className={css.userAvatarContainer}>
        <img src="" alt="User avatar" ref={userAvatarRef} className={css.userAvatar} />
        <button className={css.uploadPhotoBtn}>
          <div className={css.btnIconContainer}>
            <svg className={css.uploadBtn} width="20" height="20">
              <use href={`${sprite}#${`icon-upload`}`} />
            </svg>
            <span className={css.inputText}>Upload a photo</span>
          </div>
          <input
            type="file"
            className={css.fileInput}
            id="fileInput"
            name="avatar"
            onChange={handleFileSelect}
          />
        </button>
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
                className={css.genderInput}
                value="female"
                name="gender"
                {...register('gender')}
              />
              Woman
            </label>
            <label className={`${css.genderLabel} ${css.inputText}`}>
              <input
                type="radio"
                className={css.genderInput}
                value="male"
                name="gender"
                {...register('gender')}
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
              name="name"
              {...register('name')}
              className={`${css.userInfoField} ${css.inputText} ${errors.name && css.error}`}
            />
            {errors.name && (
              <p className={`${css.inputText} ${css.error}`}>{errors.name.message}</p>
            )}
          </label>
          <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
            Email
            <input
              disabled
              type="email"
              name="email"
              {...register('email')}
              className={`${css.userInfoField} ${css.inputText} ${errors.email && css.error}`}
            />
            {errors.email && (
              <p className={`${css.inputText} ${css.error}`}>{errors.email.message}</p>
            )}
          </label>
        </div>
        <div className={css.userInfoContainer}>
          <h3 className={`${css.inputTitle}`}>My daily norma</h3>
          <div className={css.normaWaterContainer}>
            <div>
              <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>For woman:</h4>
              <p className={css.greenText}>V=(M*0,03) + (T*0,4)</p>
            </div>
            <div>
              <h4 className={`${css.normaGenderTitle} ${css.inputText}`}>For man:</h4>
              <p className={css.greenText}>V=(M*0,04) + (T*0,6)</p>
            </div>
          </div>
          <div className={css.normaWaterTextContainer}>
            <p className={`${css.normaWaterText} ${css.formulaDescription}`}>
              <span className={css.greenText}>*</span> V is the volume of the water norm in liters
              per day, M is your body weight, T is the time of active sports, or another type of
              activity commensurate in terms of loads (in the absence of these, you must set 0)
            </p>
          </div>
          <div className={css.activeTimeContainer}>
            <svg width="4.62" height="21.23">
              <use href={`${sprite}#${`icon-exclamation_point`}`} />
            </svg>
            <p className={css.inputText}>Active time in hours</p>
          </div>
        </div>
        <div className={css.userInfoContainer}>
          <label className={`${css.userInfoLabel} ${css.inputText}`}>
            Your weight in kilograms:
            <input
              type="number"
              step="any"
              name="weight"
              {...register('weight')}
              className={`${css.userInfoField} ${css.inputText}  ${errors.weight && css.error}`}
            />
            {errors.weight && (
              <p className={`${css.inputText} ${css.error}`}>{errors.weight.message}</p>
            )}
          </label>
          <label className={`${css.userInfoLabel} ${css.inputText}`}>
            The time of active participation in sports:
            <input
              type="number"
              step="any"
              name="dailyTimeActivity"
              {...register('dailyTimeActivity')}
              className={`${css.userInfoField} ${css.inputText}  ${
                errors.dailyTimeActivity && css.error
              }`}
            />
            {errors.dailyTimeActivity && (
              <p className={`${css.inputText} ${css.error}`}>{errors.dailyTimeActivity.message}</p>
            )}
          </label>
        </div>
        <div className={css.userInfoContainer}>
          <div className={css.amountOfWaterContainer}>
            <p
              className={`${css.amountOfWaterText} ${css.inputText} ${css.formulaDescriptionContainer}`}
            >
              The required amount of water in liters per <span>day:</span>
            </p>
            <span className={css.amountOfWaterText}>
              {normaWater ? normaWater : getValues('dailyNorma')}L
            </span>
          </div>
          <label className={`${css.userInfoLabel} ${css.inputTitle}`}>
            Write down how much water you will drink:
            <input
              type="number"
              step="any"
              name="dailyNorma"
              {...register('dailyNorma')}
              className={`${css.userInfoField} ${css.inputText}  ${errors.dailyNorma && css.error}`}
            />
            {errors.dailyNorma && (
              <p className={`${css.inputText} ${css.error}`}>{errors.dailyNorma.message}</p>
            )}
          </label>
        </div>
      </div>
      <button type="submit" className={`${css.saveBtn} ${css.inputTitle}`}>
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
