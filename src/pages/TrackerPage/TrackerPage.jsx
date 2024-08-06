import { MonthInfo } from '../../components/MonthInfo/MonthInfo.jsx';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo'

export default function TrackerPage() {
  return (
    <div>
      <WaterMainInfo />
      <WaterDetailedInfo/>
      <MonthInfo />
    </div>
  );
}
