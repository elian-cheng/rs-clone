import React from "react";
import { ReactComponent as RssIcon } from "../../assets/images/footer/rss.svg";
import { ReactComponent as GhIcon } from "../../assets/images/footer/github.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <a href="https://rs.school/js/" target="blanket" className="footer__rss-link">
          <RssIcon className="footer__rss-icon" />
        </a>
        <div className="footer__gh-links">
          <a href="https://github.com/elian-cheng" target="blanket" className="footer__gh-link">
            <GhIcon className="footer__gh-icon" />
            <span className="footer__gh-desc">Olga Chernega</span>
          </a>
          <a href="https://github.com/eugeneburkovskiy" target="blanket" className="footer__gh-link">
            <GhIcon className="footer__gh-icon" />
            <span className="footer__gh-desc">Eugene Burkovskiy</span>
          </a>
          <a href="https://github.com/ordinaraviro" target="blanket" className="footer__gh-link">
            <GhIcon className="footer__gh-icon" />
            <span className="footer__gh-desc">Oleksandr Mazghin</span>
          </a>
        </div>
        <div className="footer__copy-year">© 2023</div>
      </div>
    </div>
  );
}
