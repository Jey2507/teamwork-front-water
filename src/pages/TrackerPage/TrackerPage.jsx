


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { selectLoading } from '../../redux/auth/selectors';

import { getUser } from '../../redux/auth/operations';
// import { selectLoading } from '../../redux/water/selectors';

import Loader from '../../components/Loader/Loader';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';

import css from './TrackerPage.module.css';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <section>
      <Loader loading={loading} />
      <div className={css.trackContainer}>
        <Helmet>
          <title>AQUATRACK</title>
        </Helmet>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
    </section>
  );
};

export default TrackerPage;