import { MonthInfo } from '../MonthInfo/MonthInfo.jsx';
import DailyInfo from '../DailyInfo/DailyInfo.jsx';
import UserPanel from '../UserPanel/UserPanel.jsx';
import css from '../WaterDetailedInfo/WaterDetailedInfo.module.css';

export default function WaterDetailedInfo() {
  return (
    <div className={css.waterInfoBox}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
}
