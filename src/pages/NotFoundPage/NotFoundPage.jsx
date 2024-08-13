import { Helmet } from 'react-helmet-async';
import css from "../NotFoundPage/NotFoundPage.module.css"

export default function NotFoundPage() {
  return (
    <div>
      <Helmet>
        <title>Not found</title>
      </Helmet>
      <div className={css.not}></div>
    </div>
  );
}
