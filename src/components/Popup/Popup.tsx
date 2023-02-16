import React, { useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';

interface IPopup {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  popup: string;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
}

export const Popup: React.FC<IPopup> = ({ active, setActive, popup, setPopup }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActive(false);
    }
  };
  useEffect(() => {
    if (popup === 'signUp' && !active) setPopup('login');
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div
      className={!active ? 'popup__wrapper' : 'popup__wrapper popup__wrapper_active'}
      onMouseDown={() => setActive(false)}
      onKeyDown={() => handleKeyDown}
      role="textbox"
      tabIndex={0}
    >
      <div
        className={!active ? 'popup__content' : 'popup__content popup__content_active'}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={() => handleKeyDown}
        role="textbox"
        tabIndex={0}
      >
        <div className={`wrapper ${popup === 'login' ? '' : ' active'}`}>
          <button
            className="popup__close-btn"
            onClick={() => setActive(false)}
            role="button"
            onKeyDown={() => handleKeyDown}
            tabIndex={0}
          >
            &times;
          </button>
          <SignUp setWhatPopup={setPopup} />
          <Login setWhatPopup={setPopup} />
        </div>
      </div>
    </div>
  );
};

export default Popup;
