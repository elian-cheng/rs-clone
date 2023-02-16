import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './styles.scss';
import { titles } from './routing/routes';
import Router from './routing/Router/Router';
import Sidebar from './components/Sidebar/Sidebar';
import Popup from './components/Popup/Popup';

export default function App() {
  const [popupActive, setPopupActive] = useState(false);
  const [whatPopup, setWhatPopup] = useState('signUp');
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] ?? 'TS Academy';
  }, [location]);

  return (
    <>
      <div className="page-wrapper">
        <div className="page-content">
          <Header />
          <main className="main">
            <Router />
          </main>
          <Footer />
        </div>
      </div>
      <Sidebar onSignInOpen={setPopupActive} />
      <Popup
        active={popupActive}
        setActive={setPopupActive}
        popup={whatPopup}
        setPopup={setWhatPopup}
      />
    </>
  );
}
