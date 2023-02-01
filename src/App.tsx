import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './styles.scss';
import { titles } from './routing/routes';
import Router from './routing/Router/Router';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] ?? 'TS Academy';
  }, [location]);

  return (
    <>
      <Header />
      <main className="main">
        <Router />
      </main>
      <Footer />
    </>
  );
}
