import React from 'react';
import MemberCard from './MemberCard';
export interface ITeam {
  id: number;
  src: string;
  title: string;
  description: string;
  git: string;
}

interface TeamProps {
  team: ITeam[];
}

export default function TeamMembers(props: TeamProps) {
  const { team } = props;
  return (
    <section className="team">
      <div className="team__container">
        <h2 className="team__title title">Our Team</h2>
        <div className="team__content">
          {team.map((member) => {
            return <MemberCard key={member.id} {...member} />;
          })}
        </div>
      </div>
    </section>
  );
}
