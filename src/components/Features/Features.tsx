import React from 'react';
import { IFeature } from '../../types/interfaces';
import FeatureCard from './FeatureCard';

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
