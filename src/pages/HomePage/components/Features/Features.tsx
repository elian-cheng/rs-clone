import React from 'react';
import FeatureCard from './FeatureCard';

export interface IFeature {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface IFeaturesProps {
  features: IFeature[];
}

export default function Features(props: IFeaturesProps) {
  const { features } = props;
  return (
    <section className="features">
      <div className="features__container">
        <h2 className="features__title title">What's in the course?</h2>
        <h5 className="features__subtitle subtitle">Please log in to get access to all features</h5>
        {features.map((feature) => {
          return <FeatureCard key={feature.id} {...feature} />;
        })}
      </div>
    </section>
  );
}
