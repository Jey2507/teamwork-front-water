import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import Container from '../../components/Container/Container.jsx';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import css from './TrackerPage.module.css';
import { Helmet } from 'react-helmet-async';
import { selectRefreshToken } from '../../redux/auth/selectors.js';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

export default function TrackerPage() {
  const cookies = new Cookies();

  console.log('refreshToken', cookies.get('refreshToken'));

  return (
    <>
      <Helmet>
        <title>Tracker - AquaTrack</title>
      </Helmet>
      <Container>
        <div className={css.wrapper}>
          <WaterMainInfo />
          <WaterDetailedInfo />
        </div>
      </Container>
    </>
  );
}
