import React from 'react';
import { ReactComponent as RssIcon } from '../../assets/images/footer/rss.svg';
import { teamMembers } from '../../utils/teamMembers';
import GithubItem from './FooterGithub';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <a
          href="https://rs.school/js/"
          target="_blank"
          rel="noreferrer"
          className="footer__rss-link"
        >
          <RssIcon className="footer__rss-icon" />
        </a>
        <div className="footer__gh-links">
          {teamMembers.map((member, i) => {
            return <GithubItem key={i} git={member.git} title={member.title}/>
          })}
        </div>
        <div className="footer__copy-year">© 2023</div>
      </div>
    </div>
  );
}
