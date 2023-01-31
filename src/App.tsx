import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './styles.scss';
import { IRoute } from './types/interfaces';
import { routes, titles } from './utils/routes';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] ?? 'TS Academy';
  }, [location]);

  return (
    <>
      <Header />
      <main className="main">
        <Routes>{routes.map(createRoutes)}</Routes>
      </main>
      <Footer />
    </>
  );
}

function createRoutes(props: IRoute) {
  const {
    path, //
    element,
  } = props;
  return <Route path={path} element={element} />;
}
