import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './styles.scss';
import { titles } from './routing/routes';
import Router from './routing/Router/Router';
import Sidebar from './components/Sidebar/Sidebar';
import { IUser } from './API/authorization';
import Popup from './components/Popup/Popup';
import { UserContext } from './context/UserContext';

export default function App() {
  const [popupActive, setPopupActive] = useState(false);
  const [whatPopup, setWhatPopup] = useState('login');
  const [user, setUser] = useState<IUser | null>(null);
  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] ?? 'TS Academy';
  }, [location]);

  return (
    <UserContext.Provider value={userValue}>
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
    </UserContext.Provider>
  );
}
