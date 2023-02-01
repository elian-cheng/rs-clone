import React from 'react';
import FeatureCard from './FeatureCard';

export interface IFeature {
  id: number;
  src: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: IFeature[];
}

export default function Features(props: FeaturesProps) {
  const { features } = props;
  return (
    <div className="features">
      <div className="features__container">
        {features.map((feature) => {
          return <FeatureCard key={feature.id} {...feature} />;
        })}
      </div>
    </div>
  );
}
