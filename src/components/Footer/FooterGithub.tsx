import React from 'react';
import { ReactComponent as GhIcon } from '../../assets/images/footer/github.svg';

export default function GithubItem(obj:{git:string, title:string}) {

  return (
  <a
    href={obj.git}
    target="_blank"
    rel="noreferrer"
    className="footer__gh-link"
  >
    <GhIcon className="footer__gh-icon" />
    <span className="footer__gh-desc">{obj.title}</span>
  </a>
  );
}
