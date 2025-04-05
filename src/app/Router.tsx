import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import { AppWithLogin } from './App';
import PageNotFound from './pages/PageNotFound';
import StreamPage from './pages/Stream.page';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppWithLogin />}>
        {/* HOME PAGE */}
        <Route path="/" element={<Navigate to="/flux" />} />

        {/* VIEWS/STREAM REDIRECTIONS PAGES */}
        <Route path="/stream" element={<Navigate to="/flux" />} />
        <Route path="/stream/:id" element={<RedirectWithParams to="/flux" />} />

        {/* STREAMS PAGES */}
        <Route path="/flux" element={<StreamPage />} />
        <Route path="/flux/:id" element={<StreamPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

const RedirectWithParams = ({
  to,
  query,
  paramNames = ['id'],
}: {
  to: string;
  query?: string;
  paramNames?: string[];
}) => {
  const params = useParams();
  const pathParams = paramNames.map(name => params[name]).join('/'); // Build path from params
  const queryString = query ? `?${query}` : '';

  return <Navigate to={`${to}/${pathParams}${queryString}`} replace />;
};
