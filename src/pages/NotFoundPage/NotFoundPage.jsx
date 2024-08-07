import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <div>
      <Helmet>
        <title>Not found</title>
      </Helmet>
      <p>Not Found Page</p>
    </div>
  );
}
