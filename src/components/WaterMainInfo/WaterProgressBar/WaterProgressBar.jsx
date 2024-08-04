import { useSelector } from 'react-redux';
import css from './WaterProgressBar.module.css';
import { useEffect, useRef, useState } from 'react';
import { selectAllWaterByDay } from '../../redux/water/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { useDateFC } from '../../helpers/utils.js';
import { selectCalendar } from '../../redux/calendar/selector.js';

const WaterProgressBar = () => {
  const dayliWater = useSelector(selectUser);
  const allWaterByDay = useSelector(selectAllWaterByDay);
  const progress = allWaterByDay / (dayliWater.dailyWaterIntake * 10);
  const roundedProgress = Math.round(progress);

  const containerRef = useRef(null);
  const [ellipsePosition, setEllipsePosition] = useState(0);

  const updateEllipsePosition = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      let adjustedProgress = Math.min(100, Math.max(0, roundedProgress));
      let newPosition = (adjustedProgress * containerWidth) / 100;

      // Умова для корекції позиції еліпса
      if (window.innerWidth > 768) {
        newPosition += 8; // корекція для ширших екранів
      }
      newPosition = Math.min(newPosition, containerWidth);

      setEllipsePosition(newPosition);
    }
  };

  useEffect(() => {
    updateEllipsePosition();
  }, [roundedProgress]);

  useEffect(() => {
    updateEllipsePosition(); // Перераховуємо позицію при зміні ширини екрана
    window.addEventListener('resize', updateEllipsePosition);
    return () => {
      window.removeEventListener('resize', updateEllipsePosition);
    };
  }, [roundedProgress]);

  const shouldShowPercentage =
    (roundedProgress >= 12 && roundedProgress <= 38) ||
    (roundedProgress >= 60 && roundedProgress <= 85);

  const { numberOfMonth, monthName } = useDateFC();

  const today = new Date().toISOString().split('T')[0];
  const currentActiveDay = useSelector(selectCalendar).split('T')[0];
  return (
    <div className={css.waterProgressBarContainer}>
      <div className={css.progressBarInfo}>
        <p className={css.data}>
          {currentActiveDay === today
            ? 'Today'
            : `${numberOfMonth - 1}, ${monthName}`}
        </p>

        <div className={css.progressBarContainer} ref={containerRef}>
          <div
            className={css.progressBar}
            style={{ width: `${Math.min(100, Math.max(0, roundedProgress))}%` }}
          ></div>
          <div
            className={css.progressEllipse}
            style={{ left: `${ellipsePosition + 8}px` }}
          ></div>
        </div>
        {shouldShowPercentage && (
          <div
            className={css.progressPercentageMove}
            style={{ left: `${ellipsePosition + 8}px` }}
          >
            {roundedProgress}%
          </div>
        )}

        <ul className={css.progressPercentage}>
          <li>0%</li>
          <li>50%</li>
          <li>100%</li>
        </ul>
      </div>
    </div>
  );
};

export default WaterProgressBar;