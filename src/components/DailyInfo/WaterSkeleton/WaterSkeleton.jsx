import Skeleton from 'react-loading-skeleton';
import css from './WaterSkeleton.module.css';

export const WaterSkeleton = ({ countWater }) => {
  return Array.from({ length: countWater }, (_, index) => (
    <div className={css.waterSkeleton} key={index}>
      <div className={css.leftCol}>
        <Skeleton width={44} height={45} />
      </div>
      <div className={css.centerCol}>
        <Skeleton count={2} style={{ marginBottom: '0.6rem' }} />
      </div>
      <div className={css.rightCol}>
        <Skeleton count={2} style={{ marginBottom: '0.6rem' }} />
      </div>
    </div>
  ));
};
