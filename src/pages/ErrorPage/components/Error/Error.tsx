import React from 'react';

export default function Error() {
  return (
    <div className="main__error error" id="error-page">
      <div className="error__content">
        <h2 className="error__title" data-text="404">
          404
        </h2>
        <h4 className="error__subtitle" data-text="Opps! Page is not found">
          Oops! Page is not found
        </h4>
        <p className="error__text">Sorry, the page you're looking for doesn't exist.</p>
        <div className="error__btns">
          <a href="/">Return home</a>
        </div>
      </div>
    </div>
  );
}
