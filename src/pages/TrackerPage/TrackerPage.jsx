import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import Container from '../../components/Container/Container.jsx';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import css from './TrackerPage.module.css';
import { Helmet } from 'react-helmet-async';

export default function TrackerPage() {
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
