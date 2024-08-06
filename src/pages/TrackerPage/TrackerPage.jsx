import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo'
import Container from '../../components/Container/Container.jsx';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import css from './TrackerPage.module.css';

export default function TrackerPage() {
  return (
    <Container>
      <div className={css.wrapper}>
        <WaterMainInfo />
        <WaterDetailedInfo/>
      </div>
    </Container>
  );
}
