import React from 'react';
import { featuresData } from '../../utils/featuresData';
import Definition from './components/Definition/Definition';
import Features from './components/Features/Features';
import FullScreenBlock from './components/FullScreenBlock/FullScreenBlock';

export default function HomePage() {
  return (
    <>
      <FullScreenBlock />
      <Definition />
      <Features features={featuresData} />
    </>
  );
}
