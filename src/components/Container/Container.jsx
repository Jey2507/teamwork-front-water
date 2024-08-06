import clsx from 'clsx';
import s from './Container.module.css';

const Container = ({ className, children }) => {
  return <div className={clsx(s.container, className && className)}>{children}</div>;
};

export default Container;
