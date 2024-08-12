import AddWaterBtn from './AddWaterBtn/AddWaterBtn';
import ChooseDate from '../ChooseDate/ChooseDate';
import WaterList from '../../components/WaterList/WaterList';
import { SkeletonTheme } from 'react-loading-skeleton';

import css from './DailyInfo.module.css';

export default function DailyInfo() {
  return (
    <SkeletonTheme>
      <div className={css.section}>
        <ChooseDate />
        <AddWaterBtn
          smallBtn={true}
          mainColor={'none'}
          backgroundColorIcon={'var(--accent)'}
          colorText={'var(--main)'}
          hoverBackgroundColorIcon={'var(--main)'}
          colorIcon={'var(--main)'}
          hoverColorIcon={'var(--main-white)'}
        />
      </div>
      <WaterList />
    </SkeletonTheme>
  );
}
