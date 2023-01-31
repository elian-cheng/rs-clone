import React from 'react';
import Definition from '../components/Definition/Definition';
import Features from '../components/Features/Features';
import FullScreenBlock from '../components/FullScreenBlock/FullScreenBlock';
import { featuresData } from '../utils/featuresData';

export default function HomePage() {
  return (
    <>
      <FullScreenBlock />
      <Definition />
      <Features features={featuresData} />
    </>
  );
}
