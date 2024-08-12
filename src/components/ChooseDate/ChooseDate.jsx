import { format, isToday, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';

import { selectDate } from '../../redux/water/selectors';
import css from './ChooseDate.module.css';

export default function ChooseDate() {
  const selectedData = useSelector(selectDate);

  const parsedDate = parseISO(selectedData);
  const isTodayData = isToday(parsedDate);

  const formattedDate = isTodayData ? 'Today' : format(parsedDate, 'd, MMMM');

  return <p className={css.title}>{formattedDate}</p>;
}
