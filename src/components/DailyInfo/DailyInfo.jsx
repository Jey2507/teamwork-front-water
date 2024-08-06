import AddWaterBtn from './AddWaterBtn/AddWaterBtn';
import ChooseDate from '../ChooseDate/ChooseDate';
import waters from '../../../dailyInfo.json';
import WaterList from '../../components/WaterList/WaterList';

import css from './DailyInfo.module.css';

export default function DailyInfo() {
  return (
    <>
      <div className={css.wraper}>
        <ChooseDate />
        <AddWaterBtn
          mainColor={'none'}
          backgroundColorIcon={'var(--accent)'}
          colorText={'var(--main)'}
          colorIcon={'var(--main)'}
        />
        <WaterList waters={waters} />
      </div>
    </>
  );
}
