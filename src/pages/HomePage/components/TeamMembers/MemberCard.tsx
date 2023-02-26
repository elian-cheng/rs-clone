import React from 'react';
import { ITeam } from './TeamMembers';

export default function MemberCard(props: ITeam) {
  const {
    src, //
    title,
    description,
    git,
  } = props;
  return (
    <div className="member">
      <div className="member__image">
        <span className="member__overlay"></span>
        <div className="member__photo">
          <img src={src} alt={title} />
        </div>
      </div>
      <div className="member__info">
        <h6 className="member__title name-title">{title}</h6>
        <p className="member__description description">{description}</p>
        <a href={git} target="_blank" rel="noreferrer" className="member__button button">
          View More
        </a>
      </div>
    </div>
  );
}
