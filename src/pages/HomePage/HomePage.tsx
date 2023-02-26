import React from 'react';
import { featuresData } from '../../utils/featuresData';
import { teamMembers } from '../../utils/teamMembers';
import Definition from './components/Definition/Definition';
import Features from './components/Features/Features';
import FullScreenBlock from './components/FullScreenBlock/FullScreenBlock';
import TeamMembers from './components/TeamMembers/TeamMembers';

export default function HomePage() {
  return (
    <>
      <FullScreenBlock />
      <Definition />
      <Features features={featuresData} />
      <TeamMembers team={teamMembers} />
    </>
  );
}
