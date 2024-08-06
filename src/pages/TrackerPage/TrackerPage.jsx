import Container from '../../components/Container/Container.jsx';
import { MonthInfo } from '../../components/MonthInfo/MonthInfo.jsx';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';

export default function TrackerPage() {
  return (
    <Container>
      <WaterMainInfo />
      <MonthInfo />
    </Container>
  );
}
