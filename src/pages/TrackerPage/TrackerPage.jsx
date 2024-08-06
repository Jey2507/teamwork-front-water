import DailyInfo from '../../components/DailyInfo/DailyInfo.jsx';
import { MonthInfo } from '../../components/MonthInfo/MonthInfo.jsx';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import css from './TrackerPage.module.css';

export default function TrackerPage() {
  return (
    <>
      <div className={css.wrapper}>
        <WaterMainInfo />
        <DailyInfo />
      </div>
      <MonthInfo />
    </>
  );
}
